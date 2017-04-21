/**
 * Utility for calculations involving pixels
 */
export const emptyPixel: number[] = [0, 0, 0, 0];

export function add(one: number[], other: number[]): number[] {
    return [one[0] + other[0], one[1] + other[1], one[2] + other[2], one[3] + other[3]];
}

function toYUV(pixel: number[]): number[] {
    if (pixel === undefined) {
        throw new Error("Pixel is mandatory.");
    }
    return [
        pixel[0] * 0.299 + pixel[1] * 0.587 + pixel[2] * 0.114,
        pixel[0] * -0.14713 + pixel[1] * -0.28886 + pixel[2] * 0.436,
        pixel[0] * 0.615 + pixel[1] * -0.51499 + pixel[2] * -0.10001
    ];
}

export function getDistance(onePixel: number[], otherPixel: number[]) {
    const weight = [1, 1, 1];
    
    if (onePixel === undefined) {
        throw new Error("onePixel is mandatory.");
    }
    if (otherPixel === undefined) {
        throw new Error("otherPixel is mandatory.");
    }
    onePixel = toYUV(onePixel);
    otherPixel = toYUV(otherPixel);

    return Math.sqrt(
        Math.pow(weight[0] * (onePixel[0] - otherPixel[0]), 2) +
        Math.pow(weight[1] * (onePixel[1] - otherPixel[1]), 2) +
        Math.pow(weight[2] * (onePixel[2] - otherPixel[2]), 2)
    );
}

