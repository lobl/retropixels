import { ColorMap } from '../model/ColorMap';
import { Palette } from '../model/Palette';
import { PixelImage } from '../model/PixelImage';
import { GraphicMode } from '../profiles/GraphicMode';
import { GraphicModes } from '../profiles/GraphicModes';
import { C64Layout } from './C64Layout';
import { IC64Format } from './IC64Format';

/**
 * A Koala Painter compatible picture.
 */
export class KoalaPicture implements IC64Format {
  public formatName: string = 'Koala';
  public mode: GraphicMode = GraphicModes.c64Multicolor;
  private loadAddress: Uint8Array;
  private bitmap: Uint8Array;
  private screenRam: Uint8Array;
  private colorRam: Uint8Array;
  private background: Uint8Array;
  /**
   * Convert a pixelImage to a KoalaPic
   * PixelImage must have the following specs:
   * - 320 x 160 pixels
   * - colormap 0 has one color, the background color
   * - colormap 1 and 2 have the screenram
   * - colormap 3 has the colorram
   */
  public fromPixelImage(pixelImage: PixelImage) {
    this.loadAddress = new Uint8Array(2);
    this.loadAddress[0] = 0;
    this.loadAddress[1] = 0x60;

    this.bitmap = C64Layout.convertBitmap(pixelImage);
    this.screenRam = C64Layout.convertScreenram(pixelImage, 2, 1);
    this.colorRam = C64Layout.convertColorram(pixelImage, 3);
    this.background = new Uint8Array(1);
    this.background[0] = pixelImage.colorMaps[0].get(0, 0);
  }

  /**
   * Read the picture from an 8-bit buffer.
   * @param  {Uint8Array} arrayBuffer The buffer to read.
   */
  public read(arrayBuffer: Uint8Array): void {
    this.loadAddress = new Uint8Array(arrayBuffer, 0, 2);
    this.bitmap = new Uint8Array(arrayBuffer, 2, 8000);
    this.screenRam = new Uint8Array(arrayBuffer, 8002, 1000);
    this.colorRam = new Uint8Array(arrayBuffer, 9002, 1000);
    this.background = new Uint8Array(arrayBuffer, 10002, 1);
  }

  /**
   * Convert to a sequence of bytes.
   * @return {Uint8Array} A sequence of 8-bit bytes.
   */
  public toMemoryMap(): Uint8Array[] {
    return [this.loadAddress, this.bitmap, this.screenRam, this.colorRam, this.background];
  }
}
