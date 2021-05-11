const mongoose = require('mongoose')


const AuthSchema = mongoose.Schema({
    
    
    username: {
        type: String,
        
    },
    facebookId : {type: String},
    googleId : {type: String},
    email: {
        type: String,
       
    },
    password: {
        type: String,
       
    },
    image: { type: String },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    adress: {
        city: { type: String },
        land: { type: String },
        work: { type: String },
        description: { type: String },
    },
    

},{ timestamps : true})




module.exports = mongoose.model('user', AuthSchema)