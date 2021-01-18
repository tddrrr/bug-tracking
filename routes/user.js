import express from 'express'
import userController from '../controllers/user.js'
import authController from '../controllers/auth.js'
const router = express.Router();

router.get('/getUsers', userController.getAllUsers);
router.put('/updateUserName/:id', userController.updateUserName);
router.put('/updatePassword', authController.middleware.authentication, userController.updatePassword);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;