const User = require('../models/user-model')
const bcrypt = require('bcrypt');


class UserService{
        // creation utilisateur
        static async createUser(data){
            //verification si l'adresse à déjà été utilisé.
            const exist = await User.findOne({email : data.email})

            if (exist) throw new Error("L'adresse email est déjà utilisé")
            
            const hashPassword = await UserService.hashPassword(data.password, 10);
            const user = new User({
                first_name :  data.first_name,
                name :        data.name,
                email  :      data.email ,
                password :   hashPassword
            });
            user.save()
            const authToken = await user.generateAuthToken()

            return {user, authToken}

            }

        // methode static hashage de mot de passe
        static async hashPassword(password) {

            return await bcrypt.hash(password, 10);

        }

        static async comparePassword(password, hashPassword){

            return await bcrypt.compare(password, hashPassword)

        }

        static async findUserByEmail(email){
            const user = await User.findOne({email: email})

            if (!user) throw new Error("Aucun utilisateur trouvé pour ce compte, veuiller créer un compte")

            return user
        }
}


module.exports = UserService