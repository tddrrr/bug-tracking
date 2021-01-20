import express from 'express'
import bugController from '../controllers/bug.js'
import authController from '../controllers/auth.js'
const router = express.Router();

router.post('/createBug', authController.middleware.authentication, bugController.createBug);
router.put('/updateBug', authController.middleware.authentication, bugController.updateBug);
router.put('/assignBug', authController.middleware.authentication, bugController.assignBug);
router.get('/getAllBugs/:id', authController.middleware.authentication, bugController.getAllBugs);
export default router;