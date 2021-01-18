import express from 'express'
import projectController from '../controllers/project.js'
import authController from '../controllers/auth.js'
const router = express.Router();

router.get('/getProjects', authController.middleware.authentication, projectController.getAllProjects);
router.post('/createProject', authController.middleware.authentication, projectController.createProject);
router.put('/updateProject/:id', authController.middleware.authentication, projectController.updateProject);
router.delete('/deleteProject/:id', authController.middleware.authentication, projectController.updateProject);

export default router;
