import db from '../config/db.js'
import User from './User.js'
import Project from './Project.js'
import Bug from './Bug.js'
import Team from './Team.js'
import UserTeam from './UserTeam.js'

//many to many
User.belongsToMany(Team, {through: "UserTeam", foreignKey: "userID"});
Team.belongsToMany(User, {through: "UserTeam", foreignKey: "teamID"});

//1 to many teams - projects
Team.hasMany(Project, {foreignKey: "teamID"});
Project.belongsTo(Team, {foreignKey: "teamID"});

//projects-bugs
Project.hasMany(Bug, {foreignKey: "projectID"});
Bug.belongsTo(Project, {foreignKey: "projectID"});

//bugs-users
User.hasMany(Bug, {foreignKey: "userID"});
Bug.belongsTo(User, {foreignKey: "userID"});

export default {
    User,
    Bug,
    Team,
    Project,
    UserTeam,
    db
}