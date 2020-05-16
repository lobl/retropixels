import PixelImage from '../model/PixelImage';
import GraphicMode from '../profiles/GraphicMode';

interface IBinaryFormat {
  formatName: string;
  supportedModes: string[];

  fromPixelImage(pixelImage: PixelImage): void;
  toMemoryMap(): Uint8Array[];
}
export default IBinaryFormat;
