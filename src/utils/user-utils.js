import User from '../models/user-model.js';

class UserUtils {
    static async findUserById(id) {
        const user = await User.findById(id);

        if (!user) throw new Error("Aucun utilisateur trouvé");
        return user;
    }
}

export default UserUtils;