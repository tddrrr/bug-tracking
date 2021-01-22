import models from '../models/index.js'
import jwt from 'jsonwebtoken'
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
    },
    login: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.status(400).send({message: "You didn't complete the required fields"});
        } else try {
            const user = await User.findOne({where: {Email: req.body.email}})
            if (user.Password === req.body.password) {
                const token = jwt.sign(user.id, process.env.JWTKEY);
                res.status(200).send({token});
            } 
        } catch(err) {
            res.status(500).json({err: err.message})
        }
    },
    middleware: {
        authentication: async (req, res, next) => {
            const authorizationHeader = req.headers["authorization"];
            const token = authorizationHeader && authorizationHeader.split(' ')[1]; //bearer token
            if (!token) res.status(401).send({message: "forbidden"});
            else {
                try {
                const payload = await jwt.verify(token, process.env.JWTKEY); //return id
                const user = await User.findByPk(payload);
                if (user) {
                    req.user = user;
                    next();
                }
                } catch(err) {
                    if (err.name === 'JsonWebTokenError') {
                        console.warn(err)
                        res.status(403).json({ message: err.message })
                    } else {
                        console.warn(err)
                        res.status(500).json({ message: err.message })
                    }
                }
            }
        }
    }
}