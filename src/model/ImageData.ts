// TODO: Make this a decorate for ImageData?

import { ImageDataInterface } from './ImageDataInterface';
import { PixelImage } from './PixelImage';

function coordsToindex(imageData: ImageDataInterface, x: number, y: number): number {
    const result: number = Math.floor(y) * (imageData.width << 2) + (x << 2);
    return result < imageData.data.length ? result : undefined;
}

// Set the pixel at (x,y)
export function poke(imageData: ImageDataInterface, x: number, y: number, pixel: number[]): void {
    if (pixel !== undefined) {
        const i: number = coordsToindex(imageData, x, y);
        if (i !== undefined) {
            imageData.data[i] = pixel[0];
            imageData.data[i + 1] = pixel[1];
            imageData.data[i + 2] = pixel[2];
            imageData.data[i + 3] = pixel[3];
        }
    }
}

// Get the pixel at (x,y)
export function peek(imageData: ImageDataInterface, x: number, y: number): number[] {
    const i: number = coordsToindex(imageData, x, y);
    if (i !== undefined) {
        return [
            imageData.data[i],
            imageData.data[i + 1],
            imageData.data[i + 2],
            imageData.data[i + 3]
        ];
    }
    return [0, 0, 0, 0]; // TODO: is emptyPixel defined?
}

// Draw ImageData onto a PixelImage 
export function drawImageData(imageData: ImageDataInterface, pixelImage: PixelImage) {
    for (let y: number = 0; y < pixelImage.height; y += 1) {
        for (let x: number = 0; x < pixelImage.width; x += 1) {
            let pixel: number[] = peek(imageData, x, y);
            pixelImage.poke(x, y, pixel);
        }
    }
}


