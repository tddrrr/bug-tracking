import express from 'express'
import userController from '../controllers/user.js'
const router = express.Router();

router.get('/getUsers', userController.getAllUsers);
router.put('/updateUserName/:id', userController.updateUserName);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;