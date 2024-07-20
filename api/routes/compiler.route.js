import express from 'express';
import { runGenerateFile } from '../controllers/Compiler/compiler.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
// import { test } from '../controllers/Compiler/compiler.controller.js';

const router = express.Router();

// router.get('/', test)
router.post('/generateFile', verifyToken,runGenerateFile);


export default router;