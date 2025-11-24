const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const mongoose = require('mongoose')
const user_routes = require('./src/routes/UserRoutes')
const cors = require('cors'); 


//permet transfert de données multi-origines(entre navigateur et serveur web)
const db_url = process.env.ATLAS_DB_URL
app.use(cors({
    origin:'*'
}));

app.use(express.json()); // important
app.use(express.urlencoded({ extended: true }));

//connect to mongodb
mongoose.connect(
    db_url
);

//routes
app.use('/api', user_routes);

server.listen(8000,(req,res)=>{
    console.log('Server is runnig');
})