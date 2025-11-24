const User = require('../models/UserModel')
const bcrypt = require('bcrypt');


const create_user = async(req,res) =>{
    
    try {
        //verification si l'adresse à déjà été utilisé.
        const exist = await User.findOne({email : req.body.email})
        if (exist) {
            res.status(200).send({success:false,msg:"L'adresse email est déjà utilisé"});
        } else {
            // cryptage du mot de passe avant envoie.
            try {
                const hash = await bcrypt.hash(req.body.password, 10);
                const user = new User({
                    first_name :  req.body.first_name,
                    name :        req.body.name,
                    email  :      req.body.email ,
                    password :   hash
                });
                
                const authToken = await user.generateAuthToken()

                res.status(200).send({success:true,msg:'Votre compte à bien été créer',data  : user});
        
            } catch (error) {
                res.status(400).send({success:false,msg:error.message});
            }  
            
        }
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}


module.exports = {
    create_user
}