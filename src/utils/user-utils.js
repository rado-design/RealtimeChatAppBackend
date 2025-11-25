

class UserUtils{
    static async findUserById(id) {
        const User = require('../models/user-model'); // import ici
        const user = await User.findById(id);

        if (!user) throw new Error("Aucun utilisateur trouvé");
        return user;
    }
}

module.exports = UserUtils