import TokenService from '../services/token-services.js';
import UserServices from '../services/user-services.js';

class AuthentificationController {
    static async register(req, res) {
        const data = req.body;

        try {
            const user_instance = await UserServices.createUser(data);

            // ajout de refresh token dans le cookies
            res.cookie('refreshToken', user_instance.authToken.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            res.status(201).send({
                success: true,
                message: "Utilisateur enregistré avec succés",
                user_info: user_instance.user,
                access_token: user_instance.authToken.accessToken
            });
        } catch (error) {
            res.status(400).send({ success: false, msg: error.message });
        }
    }

    static async login(req, res) {
        const data = req.body;

        try {
            const user = await UserServices.findUserByEmail(data.email);

            const password = data.password;

            const verify = await UserServices.comparePassword(password, user.password);

            if (verify) {
                const pairToken = await user.generateAuthToken();
                // ajout de refresh token dans le cookies
                res.cookie('refreshToken', pairToken.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                });

                res.status(200).json({ success: true, msg: "Vous êtes connecté avec succés", accessToken: pairToken.accessToken });
            } else {
                res.status(400).send({ success: false, msg: "Votre mot de passe est incorrect" });
            }

        } catch (error) {
            res.status(400).send({ success: false, msg: error.message });
        }
    }

    static async generateNewPairToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

            const { newAccessToken, newRefreshToken } = await TokenService.generateNewAccessToken(refreshToken);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            res.json({ accessToken: newAccessToken });
        } catch (err) {
            // Ici tu peux personnaliser le code selon l’erreur
            if (err.message === 'Aucun utilisateur trouvé') {
                return res.status(404).json({ message: err.message });
            }
            res.status(403).json({ message: err.message });
        }
    }
}

export default AuthentificationController;