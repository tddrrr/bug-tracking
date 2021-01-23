import models from '../models/index.js'
const User = models.User;
const Team = models.Team;
const Project = models.Project

export default {
    getAllProjects: async(req, res) => {
        try {
            const projects = await Project.findAll();
            if (projects) {
                res.status(200).json(projects);
            }
        } catch(err) {
            res.status(500).send(err.message);
        }
    },
    createProject: async(req, res) => {
        try {
            const project = new Project({
                Name: req.body.name,
                Description: req.body.description,
                Repo: req.body.repo
            })
            project.teamID = req.body.teamID;
            await project.save();
            res.status(201).send(project);
        } catch(err) {
            console.log(err); 
            res.status(500).json({err: err.message})
        }
    },
    updateProject: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                include: [Team]
            });
            const project = await Project.findByPk(req.params.id);
            if (project) {
                let bool = user.Teams.find((team) => team.id === project.teamID)
                if (bool) {
                    project.Name = req.body.name;
                    project.Description = req.body.description;
                    project.Repo = req.body.repo;
                    await project.save();
                    res.status(200).send("Project updated");
                } else {
                    res.status(400).send("Cannot access this project");
                }
            } else {
                res.status(404).send("This project doesn't exist");
            }
            } catch(err) {
                res.status(500).send(err.message)
            }
    },
    deleteProject: async(req, res) => {
        try {
        const user = await User.findByPk(req.user.id, {
            include: [Team]
        });
        const project = await Project.findByPk(req.body.id);
        if (project) {
            let bool = user.Teams.find((team) => team.id === project.teamID)
            if (bool) {
                await project.destroy();
                res.status(200).send("Project deleted");
            } else {
                res.status(400).send("Cannot access this project");
            }
        } else {
            res.status(404).send("This project doesn't exist");
        }
        } catch(err) {
            res.status(500).send(err.message)
        }
    }
}