import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
  UserRankings,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/userRanking', UserRankings);

export default router;