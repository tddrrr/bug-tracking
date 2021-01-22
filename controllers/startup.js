import models from '../models/index.js'
const db = models.db

export default {
    resetDatabase: (req, res) => {
        db.sync({force: true})
        .then(() => { //daca baza are conexiune sau nu, forteaza si face iar tabelele
            res.status(200).send({message: "Database reset"})
        }).catch(() => {
            res.status(500).send({message: "Server error"})
        })
    }
}