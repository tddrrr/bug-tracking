import models from '../models/index.js'
import project from './project.js';
const Bug = models.Bug

export default {
    createBug: async(req, res) => {
        try {
            const bug = await Bug.create({
                Description: req.body.description,
                Severity: req.body.severity,
                Priority: req.body.priority,
                LinkBug: req.body.linkBug,
                Status: req.body.Status
            })
            bug.projectID = req.body.projectID;
            await bug.save();
            res.status(201).send(bug);
        } catch(err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    },
    updateBug: async(req, res) => {
        try {
            const bug = await Bug.findByPk(req.body.id);
            if (bug) {
                if (bug.userID === req.user.id) {
                    bug.Status = req.body.status,
                    bug.LinkSolved = req.body.linkSolved
                    await bug.save();
                    res.status(200).send("Bug solved")
                } else {
                    res.status(400).send("You are not a team member, so you cannot update this bug")
                }
            } else {
                res.status(400).send("Bug doesn't exist");
            }
        } catch(err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    },
    assignBug: async(req, res) => {
        try {
            const bug = await Bug.findByPk(req.body.id);
            if (bug) {
                bug.userID = req.user.id;
                await bug.save();
                res.status(200).send("Bug assigned")
            } else {
                res.status(400).send("Bug doesn't exist")
            }
        } catch(err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    },
    getAllBugs: async(req, res) => {
        try {
            const bugs = await Bug.findAll({
                where: {
                    projectID: req.params.id
                }
            });
            res.status(201).send(bugs);
        } catch(err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
}