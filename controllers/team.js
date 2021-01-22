import models from '../models/index.js'
const Team = models.Team;
const User = models.User;

export default {
    createTeam: async (req, res) => {
        try {
            const team = await Team.create({
                Name: req.body.name

            })
            console.log(req.body.name)
            let user = await User.findByPk(req.user.id);

            await team.addUser(user);

            let userTeam = await User.findByPk(req.user.id,
                {
                    include: [{
                        model: Team,
                        as: 'Teams',
                        attributes: ['id', 'name']
                    }]
                })

            res.status(201).send(userTeam);
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err.message })
        }
    },
    addUserTeam: async (req, res) => {
        try {
            let team = await Team.findByPk(req.body.teamID);
            let user = await User.findByPk(req.body.userID);
            if (team && user) {
                await team.addUser(user);
            }

            let userTeam = await User.findByPk(req.body.userID,
                {
                    include: [{
                        model: Team,
                        as: 'Teams',
                        attributes: ['id', 'name']
                    }]
                })

            res.status(201).send(userTeam);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err.message })
        }
    },
    getTeamUsers: async (req, res) => {
        try {
            let team = await Team.findByPk(req.params.id);
            console.log(team);
            if (team) {
                let users = await team.getUsers();
                res.status(201).send(users);
            } else {
                res.status(400).send("Team does not exist");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err.message })
        }
    },
    getTeams: async (req, res) => {
        try {
            let teams = await Team.findAll();
            if (teams) {
                res.status(201).send(teams);
            } else {
                res.status(400).send("No teams registered yet")
            }
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    },
    //TODO: update la team (cu validare daca e membru pe echipa)
    //si delete Team
}