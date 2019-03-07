import { Request, Response } from 'express';

import path from 'path';
import fs from 'fs-extra';

export = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const filePath = path.join(process.cwd(), 'uploads', `${id}.zip`);
        await fs.ensureFile(filePath);
        res.download(filePath);
    } catch (error)  {
        res.send(error);
    }
}