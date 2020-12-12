import db from '../config/db.js'
import Sequelize from 'sequelize'

const Bug = db.define("Bug", {
    Description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Severity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Priority: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LinkBug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Status: {
        type: Sequelize.STRING,
        defaultValue: "unsolved"
    },
    LinkSolved: {
        type: Sequelize.STRING,
    }
})

export default Bug;