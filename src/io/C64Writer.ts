import * as fs from 'fs-extra';
import * as path from 'path';
import AFLIPicture from './AFLIPicture';
import FLIPicture from './FLIPicture';
import HiresPicture from './HiresPicture';
import KoalaPicture from './KoalaPicture';
import SpritePad from './SpritePad';
import PixelImage from '../model/PixelImage';
import C64Layout from './C64Layout';
import IBinaryFormat from './IBinaryFormat';

export default class C64Writer {
  // Save PixelImage as a c64 native .PRG executable.
  public static async savePrg(pixelImage: PixelImage, outFile: string): Promise<void> {
    const picture: IBinaryFormat = C64Writer.getFormat(pixelImage);
    picture.fromPixelImage(pixelImage);
    return C64Writer.saveExecutable(picture, outFile);
  }

  public static async saveBinary(pixelImage: PixelImage, outFile: string): Promise<void> {
    const picture: IBinaryFormat = C64Writer.getFormat(pixelImage);
    picture.fromPixelImage(pixelImage);
    return C64Writer.save(picture, outFile);
  }

  private static viewersFolder = '/target/c64/';

  // TODO: support multiple output formats per GraphicMode
  private static getFormat(pixelImage: PixelImage): IBinaryFormat {
    if (pixelImage.mode.id === 'c64Multicolor') {
      return new KoalaPicture();
    }

    if (pixelImage.mode.id === 'c64FLI') {
      return new FLIPicture();
    }

    if (pixelImage.mode.id === 'c64AFLI') {
      return new AFLIPicture();
    }

    if (pixelImage.mode.id === 'c64Hires' || pixelImage.mode.id === 'c64HiresMono') {
      return new HiresPicture();
    }

    if (pixelImage.mode.id === 'c64HiresSprites' || pixelImage.mode.id === 'c64MulticolorSprites') {
      return new SpritePad();
    }
    throw new Error(`Output format is not supported for mode ${pixelImage.mode.id}`);
  }

  private static async save(image: IBinaryFormat, outFile: string): Promise<void> {
    return fs.writeFile(outFile, Buffer.from(C64Layout.concat(image.toMemoryMap())));
  }

  private static async saveExecutable(image: IBinaryFormat, outFile: string): Promise<void> {
    const appDir: string = path.dirname(require.main.filename);
    const viewerFile: string = path.join(appDir, `${this.viewersFolder}${image.formatName}.prg`);
    const viewerCode = await fs.readFile(viewerFile);
    const buffer: Buffer = Buffer.from(C64Layout.concat(image.toMemoryMap()));
    const writeBuffer = Buffer.concat([viewerCode, buffer]);

    return fs.writeFile(outFile, writeBuffer);
  }
}
