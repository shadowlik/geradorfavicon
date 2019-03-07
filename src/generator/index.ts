import Jimp from 'jimp';
import fs from 'fs-extra';
import path from 'path';
import AdmZip from 'adm-zip';

import { sizes, Sizes } from './sizes';

interface Options {
    sourceImagePath: string;
    sourceImageDir: string;
    id: string;
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
    id: string;

    constructor(options: Options) {
        this.sourceImagePath = options.sourceImagePath;
        this.sourceImageDir = options.sourceImageDir;
        this.extesion = options.ext;
        this.id = options.id;

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

    async createFavicons(): Promise<any> {
        const file: Jimp = await this.readOriginalImage();
        const promise = [];

        this.sizes.forEach((size) => {
            const faviconPath = path.join(this.sourceImageDir, `favicon-${size.sufix}.${this.extesion}`);
            promise.push(file.resize(size.w, size.h).quality(100).write(faviconPath));
        });

        return Promise.all(this.sizes);
    }

    async zipSourceFolder(): Promise<any> {
        try {
            const zip = new AdmZip();
            zip.addLocalFolder(this.sourceImageDir);
            const zipFile = `${path.join(process.cwd(), 'uploads')}/${this.id}.zip`;
            zip.writeZip(zipFile);
        } catch (e) {
            console.log(e.message);
        }
    }

    async removeSourceFolder(): Promise<any> {
        await fs.remove(this.sourceImageDir);
    }
}