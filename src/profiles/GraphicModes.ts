import { PixelImage } from '../model/PixelImage';
import { ColorMap } from '../model/ColorMap';
import { Palette } from '../model/Palette';
import { GraphicMode } from '../profiles/GraphicMode';

// Palettes {{{

const peptoPalette = new Palette([
    [0, 0, 0, 0xff], // black
    [0xff, 0xff, 0xff, 0xff], // white
    [0x68, 0x37, 0x2b, 0xff], //red
    [0x70, 0xa4, 0xb2, 0xff], //cyan
    [0x6f, 0x3d, 0x86, 0xff], //purple
    [0x58, 0x8d, 0x43, 0xff], //green
    [0x35, 0x28, 0x79, 0xff], //blue
    [0xb8, 0xc7, 0x6f, 0xff], //yellow
    [0x6f, 0x4f, 0x25, 0xff], //orange
    [0x43, 0x39, 0x00, 0xff], //brown
    [0x9a, 0x67, 0x59, 0xff], //light red
    [0x44, 0x44, 0x44, 0xff], //dark gray
    [0x6c, 0x6c, 0x6c, 0xff], //medium gray
    [0x9a, 0xd2, 0x84, 0xff], //light green
    [0x6c, 0x5e, 0xb5, 0xff], //light blue
    [0x95, 0x95, 0x95, 0xff] //green
]);

const spectrumPallete = new Palette([
    [0, 0, 0, 0xff], // black
    [0, 0, 0xd7, 0xff], // blue
    [0xd7, 0, 0, 0xff], // red
    [0xd7, 0, 0xd7, 0xff], //magenta
    [0, 0xd7, 0, 0xff], //green
    [0, 0xd7, 0xd7, 0xff], //green
    [0xd7, 0xd7, 0, 0xff], // yellow
    [0xd7, 0xd7, 0xd7, 0xff], // gray
    [0, 0, 0xff, 0xff], // blue
    [0xff, 0, 0, 0xff], // red
    [0xff, 0, 0xff, 0xff], //magenta
    [0, 0xff, 0, 0xff], //green
    [0, 0xff, 0xff, 0xff], //green
    [0xff, 0xff, 0, 0xff], // yellow
    [0xff, 0xff, 0xff], // white
]);

const pysslaPalette2 = new Palette([
    [0xc5, 0xdd, 0xdf, 0xff], // white
    [0xeb, 0xae, 0x36, 0xff], // yellow
    [0xb2, 0x48, 0xcf, 0xff], // purple
    [0xd6, 0x00, 0x13, 0xff], // red
    [0x00, 0x80, 0x46, 0xff], // green
    [0xe0, 0x33, 0x1c, 0xff], // orange
    [0x00, 0x7b, 0xb8, 0xff], // blue
    [0xff, 0x00, 0x7f, 0xff], // pink
    [0x4b, 0x21, 0x00, 0xff], // brown
    [0x16, 0x16, 0x16, 0xff]  // black
]);

const pysslaPalette1 = new Palette([
    [0xbd, 0x10, 0x2c, 0xff], // red
    [0x15, 0x62, 0xae, 0xff], // blue
    [0x8e, 0x75, 0xc0, 0xff], // purple
    [0xf3, 0x35, 0xb7, 0xff], // pink
    [0xd3, 0xd3, 0xd3, 0xff], // white
    [0x06, 0x4b, 0x21, 0xff], // green
    [0xe6, 0xa7, 0x21, 0xff], // yellow
    [0x27, 0x1b, 0x25, 0xff], // brown
    [0xda, 0x2a, 0x2a, 0xff], // orange
    [0x13, 0x13, 0x13, 0xff]  // black
]);

// }}}

// C64 modes {{{

// C64 resolution and palette, but no attribute restrictions (not supported on real c64)
export const c64Unlimited = {
    width: 320,
    height: 200,
    pixelWidth: 1,
    pixelHeight: 1,
    create: function() {
        var pixelImage = new PixelImage(320, 200);
        pixelImage.colorMaps.push(new ColorMap(320, 200, peptoPalette, 1, 1));
        return pixelImage;
    }
};

// C64 standard multicolor mode
export const c64Multicolor = new GraphicMode(160, 200, 2, 1,
    function() {
        var pixelImage = new PixelImage(this.width, this.height, this.pixelWidth, this.pixelHeight);
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, this.width, this.height));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 4, 8));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 4, 8));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 4, 8));
        return pixelImage;
    }
);

// C64 standard high resolution mode
export const c64Hires = new GraphicMode(320, 200, 1, 1,
    function() {
        var pixelImage = new PixelImage(this.width, this.height, this.pixelWidth, this.pixelHeight);
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 8, 8));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 8, 8));
        return pixelImage;
    }
);

// C64 standard high resolution monochrome mode
export const c64HiresMono = new GraphicMode(320, 200, 1, 1,
    function() {
        var pixelImage = new PixelImage(this.width, this.height, this.pixelWidth, this.pixelHeight);
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, this.width, this.height));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, this.width, this.height));
        return pixelImage;
    }
);

// C64 FLI mode
export const c64FLI = new GraphicMode(160, 200, 2, 1,
    function() {
        var pixelImage = new PixelImage(this.width, this.height, this.pixelWidth, this.pixelHeight);
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 4, 8));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 4, 1));
        pixelImage.colorMaps.push(new ColorMap(this.width, this.height, peptoPalette, 4, 1));
        return pixelImage;
    }
);
// }}}

// C64 AFLI mode
export const c64AFLI = {
    width: 320,
    height: 200,
    pixelWidth: 1,
    pixelHeight: 1,
    create: function() {
        var pixelImage = new PixelImage(320, 200);
        pixelImage.colorMaps.push(new ColorMap(320, 200, peptoPalette, 8, 8));
        pixelImage.colorMaps.push(new ColorMap(320, 200, peptoPalette, 8, 1));
        return pixelImage;
    }
};

export const spectrumStandard = {
    width: 256,
    height: 192,
    pixelWidth: 1,
    pixelHeight: 1,
    create: function() {
        var pixelImage = new PixelImage(256, 192);
        pixelImage.colorMaps.push(new ColorMap(256, 192, spectrumPallete, 8, 8));
        pixelImage.colorMaps.push(new ColorMap(256, 192, spectrumPallete, 8, 8));
        return pixelImage;
    }
};

export const pyssla = {
    width: 232,
    height: 232,
    pixelWidth: 8,
    pixelHeight: 8,
    create: function() {
        var pixelImage = new PixelImage(232, 232);
        pixelImage.colorMaps.push(new ColorMap(232, 232, pysslaPalette2, 8, 8));
        return pixelImage;
    }
};

export const all = {
    'c64Multicolor': c64Multicolor,
    'c64Hires': c64Hires,
    'c64HiresMono': c64HiresMono,
    'c64FLI': c64FLI
}

