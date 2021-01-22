import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/index.js'
import dotenv from 'dotenv'
dotenv.config()
let port = 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => {
    console.log("Server is running on "+port);
})