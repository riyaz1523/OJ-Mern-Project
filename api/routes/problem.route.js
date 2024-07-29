import express from 'express';
import { createProblem, deleteProblem, getProblems, getproblemsParams, updateProblems } from '../controllers/problem.controller.js';

const router = express.Router();

router.post('/createProblem', createProblem);
router.get('/', getProblems);
router.get('/getProblemsparams/:id', getproblemsParams); 
router.put('/updateproblems/:id', updateProblems);
router.delete('/deleteProblem/:id', deleteProblem);

export default router;
