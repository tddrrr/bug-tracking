import db from '../config/db.js'
import Sequelize from 'sequelize'

const Project = db.define("Project", {
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Repo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Project;