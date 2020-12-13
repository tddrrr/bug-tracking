import express from 'express'
import authController from '../controllers/auth.js'
const router = express.Router();

router.post('/register', authController.createUser);
router.post('/login', authController.login);
// router.get('/test', authController.middleware.authentication, 
//     (req, res) => {
//         res.send(req.user);
//     }
// )

export default router;