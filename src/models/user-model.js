const mongoose = require('mongoose')
const {ObjectId} = require('bson')
const TokenService = require('../services/token-services')

const schema = mongoose.Schema;


const UserSchema = new schema(
    {
        first_name : {
            type:String,
            required : true
        },
        name : {
            type:String,
            required : true
        },
        email : {
            type :String,
            required : true
        }, 
        avatar : {
            type :String,
            required : false
        },
        telephone :{
            type : String,
            required : false
        },
        password : {
            type:String,
            required : true
        },
    }
)

//generer un token..
UserSchema.methods.generateAuthToken = async function(){
    const accessToken = TokenService.generateJwtToken(this);
    const refreshToken = TokenService.generateToken()

    // enregistrement du refreshtoken dans la base
    await TokenService.registerRefreshToken(
        {
            userId: this._id,
            token: refreshToken.token,
            expiresAt: refreshToken.expiresAt
        }
    )

    return {accessToken, refreshToken: refreshToken.token};
}

//export postSchema sous Cusotmer.
module.exports = mongoose.model("User",UserSchema)