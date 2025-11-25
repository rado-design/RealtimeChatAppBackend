const mongoose = require('mongoose')
const {ObjectId} = require('bson')


// model pour stocker le refresh token 
const refreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false }
});


module.exports = mongoose.model("RefreshToken", refreshTokenSchema);