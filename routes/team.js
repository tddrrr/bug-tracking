import express from 'express'
import teamController from '../controllers/team.js'
import authController from '../controllers/auth.js'
const router = express.Router();

router.post('/createTeam', authController.middleware.authentication, teamController.createTeam);
router.put('/addUserTeam', authController.middleware.authentication, teamController.addUserTeam);
router.get('/getTeamUsers/:id', authController.middleware.authentication, teamController.getTeamUsers);
router.get('/getTeams', authController.middleware.authentication, teamController.getTeams);


export default router;