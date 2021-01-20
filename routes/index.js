import express from 'express';
import startupController from '../controllers/startup.js'
import authRoutes from './auth.js'
import userRoutes from './user.js'
import projectRoutes from './project.js'
import teamRoutes from './team.js'
import bugRoutes from './bug.js'
const router = express.Router();

router.use('/auth', authRoutes);
router.get('/reset', startupController.resetDatabase);
router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/team', teamRoutes);
router.use('/bug', bugRoutes);

export default router;