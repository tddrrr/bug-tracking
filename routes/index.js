import express from 'express';
import startupController from '../controllers/startup.js'
import authRoutes from './auth.js'
import userRoutes from './user.js'
const router = express.Router();

router.use('/auth', authRoutes);
router.get('/reset', startupController.resetDatabase);
router.use('/user', userRoutes);

export default router;