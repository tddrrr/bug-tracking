import express from 'express';
import startupController from '../controllers/startup.js'
import authRoutes from './auth.js'
const router = express.Router();

router.use('/auth', authRoutes);
router.get('/reset', startupController.resetDatabase);

export default router;