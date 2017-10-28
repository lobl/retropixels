import { Pixels } from '../model/Pixels';

// TODO: rename to OrderedDither
export class BayerMatrix {

    private static sizePresets: { [key: string]: number[][]; } = {
        bayer2x2: [
            [1, 3],
            [4, 2],
        ],
        bayer4x4: [
            [1, 9, 3, 11],
            [13, 5, 15, 7],
            [4, 12, 2, 10],
            [16, 8, 14, 6],
        ],
        bayer8x8: [
            [1, 49, 13, 61, 4, 52, 16, 64],
            [33, 17, 45, 29, 36, 20, 48, 31],
            [9, 57, 5, 53, 12, 60, 8, 56],
            [41, 25, 37, 21, 44, 28, 40, 24],
            [3, 51, 15, 63, 2, 50, 14, 62],
            [35, 19, 47, 31, 34, 18, 46, 30],
            [11, 59, 7, 55, 10, 58, 6, 54],
            [43, 27, 39, 23, 42, 26, 38, 22],
        ],
        none: [[0]],
        test: [
            [1, 2, 3, 4],
            [12, 13, 14, 5],
            [11, 16, 15, 6],
            [10, 9, 8, 7],
        ],
        test2: [
            [1, 5, 6, 2],
            [9, 13, 14, 11],
            [10, 16, 15, 12],
            [3, 7, 8, 4],
        ],
        test3: [
            [1, 2, 3, 4, 33, 34, 35, 36],
            [5, 6, 7, 8, 37, 38, 39, 40],
            [9, 10, 11, 12, 41, 42, 43, 44],
            [13, 14, 15, 16, 45, 46, 47, 48],
            [49, 50, 51, 52, 17, 18, 19, 20],
            [53, 54, 55, 56, 21, 22, 23, 24],
            [57, 58, 59, 60, 25, 26, 27, 28],
            [61, 62, 63, 64, 29, 30, 31, 32],
        ],
        test4: [
            [32, 16, 8, 16],
            [16, 32, 0, 8],
            [8, 16, 32, 16],
            [0, 0, 0, 32],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [8, 0, 0, 0],
            [16, 8, 0, 8],
        ],
    };

    private matrix: number[][] = [];
    private width: number;
    private height: number;

    // depth: 64 for 8x8

    constructor(sizePreset: string, depth: number) {

        const sourceMatrix: number[][] = BayerMatrix.sizePresets[sizePreset];

        if (!sourceMatrix) {
            throw new Error('Unknown ordered dithering preset: ' + sizePreset);
        }

        this.height = sourceMatrix.length;
        this.width = sourceMatrix[0].length;
        const factor: number = 1 / (this.width * this.height);

        this.matrix = sourceMatrix.map((row, rowIndex) => {
            return sourceMatrix[rowIndex].map((column) => depth * (factor * column - 0.5) );
        });

    }

    public offsetColor(color: number[], x: number, y: number): number[] {
        const offset: number = this.matrix[y % this.height][x % this.width];
        return Pixels.add(color, [offset, offset, offset]);
    }
}
