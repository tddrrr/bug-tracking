import Sequelize from 'sequelize';

const db = new Sequelize("bug-tracking", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: true
    }
})

export default db;