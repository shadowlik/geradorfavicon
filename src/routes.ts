import { Router } from 'express';

const router = Router();

// Functions
import postFile from './controllers/submitFile';
import getFile from './controllers/getFile';

// Routes
router.post('/', postFile);
router.get('/:id', getFile);

export = router;