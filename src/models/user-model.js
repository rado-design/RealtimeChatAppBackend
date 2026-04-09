import mongoose from 'mongoose';
import TokenService from '../services/token-services.js';

const schema = mongoose.Schema;

const UserSchema = new schema({
    first_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
});

//generer un token..
UserSchema.methods.generateAuthToken = async function () {
    const accessToken = await TokenService.generateJwtToken(this);
    const refreshToken = await TokenService.generateToken();

    // enregistrement du refreshtoken dans la base
    await TokenService.registerRefreshToken({
        userId: this._id,
        token: refreshToken.token,
        expiresAt: refreshToken.expiresAt
    });

    return { accessToken, refreshToken: refreshToken.token };
};

//export User model
export default mongoose.model("User", UserSchema);