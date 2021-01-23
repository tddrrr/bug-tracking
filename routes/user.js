import express from 'express'
import userController from '../controllers/user.js'
import authController from '../controllers/auth.js'
const router = express.Router();

router.get('/getUsers', userController.getAllUsers);
router.get('/getUser', authController.middleware.authentication, userController.getUser);
router.put('/updateUserName', authController.middleware.authentication, userController.updateUserName);
router.put('/updatePassword', authController.middleware.authentication, userController.updatePassword);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;