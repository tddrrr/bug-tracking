import models from '../models/index.js'
import jwt from 'jsonwebtoken'
// import {jwtKey} from '../config.json'
const User = models.User
export default {
    createUser: async (req, res) => {
        const errors = [];
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            errors.push("Please complete all fields!");
        }
        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            try {
            const user = await User.findOne({where: {
                Email: req.body.email
            }})
            if (user) {
                res.status(400).json({message: "User already exists"})
            } else {
                const user = await User.create({
                    FirstName: req.body.firstName,
                    LastName: req.body.lastName,
                    Email: req.body.email,
                    Password: req.body.password
                })
                res.status(201).send(user);
            }
            } catch(err) {console.log(err); res.status(500).json({err: err.message})} 
            
        }
    }
}