#!/usr/bin/env node
/* jshint esversion: 6 */
const cli = require('commander'),
  fs = require('fs-extra'),
  path = require('path'),
  Jimp = require('jimp'),
  GraphicModes = require('./target/profiles/GraphicModes.js'),
  KoalaPicture = require('./target/io/KoalaPicture.js'),
  SpritePad = require('./target/io/SpritePad.js'),
  HiresPicture = require('./target/io/HiresPicture.js'),
  FLIPicture = require('./target/io/FLIPicture.js'),
  AFLIPicture = require('./target/io/AFLIPicture.js'),
  PNGPicture = require('./target/io/PNGPicture.js'),
  Converter = require('./target/conversion/Converter.js'),
  Poker = require('./target/conversion/Poker.js'),
  ImageData = require('./target/model/ImageData.js'),
  C64Writer = require('./target/io/C64Writer.js');
ImageEncoder = require('./target/io/ImageEncoder.js');

// defaults
let graphicMode = GraphicModes.GraphicModes.c64Multicolor;
let ditherMode = 'bayer4x4';
let ditherRadius = 32;

cli
  .version('0.7.0')
  .usage('[options] <infile> <outfile>')
  .option('-m, --mode <graphicMode>', 'c64Multicolor (default), c64Hires, c64HiresMono, c64FLI, c64AFLI')
  .option('-d, --ditherMode <ditherMode>', 'bayer2x2, bayer4x4 (default), bayer8x8')
  .option('-r, --ditherRadius [0-64]', '0 = no dithering, 32 = default', parseInt)
  .parse(process.argv);

if (!cli.mode) {
  cli.mode = 'c64Multicolor';
}

if (cli.mode in GraphicModes.GraphicModes.all) {
  console.log('Using graphicMode ' + cli.mode);
  graphicMode = GraphicModes.GraphicModes.all[cli.mode];
} else {
  console.error('Unknown Graphicmode: ' + cli.mode);
  cli.help();
  process.exit(1);
}

if (cli.ditherRadius !== undefined) {
  ditherRadius = cli.ditherRadius;
}

if (cli.ditherMode !== undefined) {
  ditherMode = cli.ditherMode;
}

const inFile = cli.args[0],
  outFile = cli.args[1];

if (inFile === undefined) {
  console.error('Input file missing.');
  cli.help();
}

if (outFile === undefined) {
  console.error('Output file missing.');
  cli.help();
}

// Save PixelImage as a PNG image.
function savePng(pixelImage, filename) {
  new Jimp(pixelImage.mode.width, pixelImage.mode.height, function(err, image) {
    if (err) throw err;
    ImageEncoder.ImageEncoder.justWrite(pixelImage, image, filename);
  });
}

function saveDebugMaps(pixelImage) {
  var mapimages = pixelImage.debugColorMaps();
  var i = 0;
  for (var mapimage of mapimages) {
    savePng(mapimage, outFile + '-map' + i++ + '.png');
  }
}

// Main {{{

Jimp.read(inFile).then(jimpImage => {
  // ImageEncoder.ImageEncoder.justRead(inFile).then(jimpImage => {
  try {
    // jimpImage.normalize();


    const pixelImage = Converter.Converter.convert(jimpImage.bitmap, graphicMode);

    outExtension = path.extname(outFile);

    if ('.kla' === outExtension || '.spd' === outExtension) {
      C64Writer.C64Writer.saveBinary(pixelImage, outFile).then(console.log('Written ' + outFile));
    } else if ('.prg' === outExtension) {
      C64Writer.C64Writer.savePrg(pixelImage, outFile).then(console.log('Written ' + outFile));
    } else if ('.png' === outExtension) {
      savePng(pixelImage, outFile);
    } else {
      throw 'Unknown file extension ' + outExtension + ', valid extensions are .png, .kla and .prg';
    }
  } catch (e) {
    console.error(e);
    cli.help();
    process.exit(1);
  }
});

// }}}
