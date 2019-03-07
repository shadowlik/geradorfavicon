import { Request, Response } from 'express';
import formidable from 'formidable';
import uniqid from 'uniqid';
/**
 * Submit File Controller
 * @param req
 * @param res
 */
const submitFile = (req: Request, res: Response) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = `${process.cwd()}/uploads/${uniqid()}/`;
    form.parse(req, function(err, fields, files) {
        res.json({fields, files});
    });
}

export = submitFile;