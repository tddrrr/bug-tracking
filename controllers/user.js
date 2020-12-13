import models from '../models/index.js'
const User = models.User

export default {
    getAllUsers: async (req, res) => {
        try {
        const users = await User.findAll();  
        if (users) {
            res.status(200).send(users);
        }} catch(err) {
            res.status(500).send({err: err.message})
        }
    },
    updateUserName: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                res.status(404).send("User doesn't exist");
            } else {
                user.FirstName = req.body.firstName;
                user.LastName = req.body.lastName;
                await user.save();
                res.status(200).send(user);
            }
            } catch(err) {
                res.status(500).send({err: err.message})
            }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                res.status(404).send("User doesn't exist");
            } else {
                await user.destroy();
                res.status(200).send(user);
            }
        } catch(err) {
            res.status(500).send({err: err.message})
        }
    }
}