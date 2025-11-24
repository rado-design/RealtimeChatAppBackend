const express = require('express');
const user_routes = express.Router();
const bodyParser = require('body-parser');
const UserControler = require('../controller/UserController');
const upload = require('../middleware/multer')



// middleware pour parser le corps de chaque requete
user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({extended:true}));
user_routes.use(upload.any())

user_routes.post('/create_user',  UserControler.create_user)


module.exports = user_routes;