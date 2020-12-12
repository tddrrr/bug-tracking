import db from '../config/db.js'
import Sequelize from 'sequelize'

const Team = db.define("Team", {
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Team;