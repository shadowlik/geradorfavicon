import Jimp from 'jimp';
import fs from 'fs-extra';
import path from 'path';

import { sizes, Sizes } from './sizes';

interface Options {
    sourceImagePath: string;
    sourceImageDir: string;
    ext: string;
}

/**
 * Favicons class
 */
export = class Favicons {
    sourceImagePath: string;
    sourceImageDir: string;
    extesion: string;
    sizes: Sizes[];

    constructor(options: Options) {
        this.sourceImagePath = options.sourceImagePath;
        this.sourceImageDir = options.sourceImageDir;
        this.extesion = options.ext;
        this.sizes = sizes;
    }

    private async readOriginalImage(): Promise<any> {
        try {
            await fs.ensureFile(this.sourceImagePath);
            return await Jimp.read(this.sourceImagePath);
        } catch (error) {
            throw new Error(error);
        }
    }

    async generate(): Promise<any> {
        const file: Jimp = await this.readOriginalImage();
        const promise = [];
        this.sizes.forEach((size) => {
            const faviconPath = path.join(this.sourceImageDir, `favicon-${size.sufix}.${this.extesion}`);
            promise.push(file.resize(size.w, size.h).quality(100).write(faviconPath));
        });
        return Promise.all(this.sizes);
    }
}