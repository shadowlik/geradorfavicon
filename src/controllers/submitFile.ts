import formidable from 'formidable';
import uniqid from 'uniqid';
import fs from 'fs-extra';

import { Request, Response } from 'express';

import generator from '../generator';

/**
 * Submit File Controller
 * @param req
 * @param res
 */
const submitFile = async (req: Request, res: Response) => {
    // Creates a unique ID for this request (Is going to be our Database ID as well)
    const id = uniqid();

    // The path we are going to upload the original image
    const path = `${process.cwd()}/uploads/${id}/`

    // Creates the unique directory in our uploads folder
    await fs.mkdir(path);

    // Recieve the file
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path;
    form.keepExtensions = true;
    form.multiples = false;

    form.parse(req, async (err, fields, files) => {
        const { image } = files;

        // Check if a image was provided
        if (!image) {
            return res.status(400).json({
                error: {
                    code: 400,
                    errorCode: 1,
                    message: 'No image was uploaded',
                }
            })
        }

        // Check if the image type allowed
        if (!/png|jpg|ico|gif|jpeg|bmp/gm.exec(image.type)) {
            await fs.remove(path);
            return res.status(400).json({
                error: {
                    code: 400,
                    errorCode: 2,
                    message: 'Invalid image format',
                }
            });
        }

        // Generate the Favicons
        const favicons = new generator(image.path).generate();

        // TODO: Save to the database

        res.json({fields, files});
    });
}

export = submitFile;