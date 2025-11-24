const mongoose = require('mongoose')
const {ObjectId} = require('bson')
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema;

// model pour stocker les tokens
const AuthTokenSchema = new schema({
    authToken : {
        type : String,
        required : true
    }
});


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
        authTokens : [
            AuthTokenSchema
        ]
    }
)

//generer un token..
UserSchema.methods.generateAuthToken = async function(){
    const authToken = jwt.sign({_id : this._id},'mafybe');
    this.authTokens.push({authToken});
    await this.save();
    return authToken;
}

//export postSchema sous Cusotmer.
module.exports = mongoose.model("User",UserSchema)