import UserServices from "../services/user-services.js";

class UserController {
    static async createUser(req, res) {
        res.status(200).send({ success: true, message: "Endpoint reached" });
    }
}

export default UserController;