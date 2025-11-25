const RefreshToken = require('../models/refreshtoken-model')
const UserUtils = require('../utils/user-utils')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


class TokenServices{
    static async registerRefreshToken(payload){
        await RefreshToken.create(
            {
                userId : payload.userId,
                token : payload.token,
                expiresAt : payload.expiresAt
            }
        )

    }

    static async generateToken(){
        return {
            token: crypto.randomBytes(64).toString("hex"),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };
    }

    // methode pour générer un nouveau token jwt
    static async generateJwtToken(user){
        const AccessToken = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '15m' }
        );

        return AccessToken
    }

    static async generateNewAccessToken(refreshTokenValue){
        const storedToken = await RefreshToken.findOne({ token: refreshTokenValue });

        if (!storedToken || storedToken.revoked) throw new Error('Invalid refresh token');
        if (storedToken.expiresAt < new Date()) throw new Error('Refresh token expired');

        // Ici findUserById va lancer une erreur si user n'existe pas
        const user = await UserUtils.findUserById(storedToken.userId);

        const newAccessToken = await TokenServices.generateJwtToken(user)

        // Rotation du refresh token
        const newRefreshToken = await TokenServices.generateToken();
        storedToken.token = newRefreshToken.token;
        storedToken.expiresAt = newRefreshToken.expiresAt; // nouvelle expiration
        await storedToken.save();

        return { newAccessToken, newRefreshToken };
    }
}

module.exports = TokenServices