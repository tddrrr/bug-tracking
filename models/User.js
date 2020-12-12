import db from '../config/db.js'
import Sequelize from 'sequelize'

const User = db.define("User", {
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING, 
        allowNull: false
    }
})

export default User;