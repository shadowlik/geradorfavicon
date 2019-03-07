import { Router } from 'express';

const router = Router();

// Functions
import postFile from './controllers/submitFile';

// Routes
router.post('/', postFile);

export = router;