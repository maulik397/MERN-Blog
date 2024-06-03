const mongoose = require('mongoose')
const { createHmac, randomBytes } = require("crypto");
const {createTokenForUser} =require("../Auth/authentication.js")
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
    }
   
},{timestamps:true})

UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified('password'))return;
    const salt = randomBytes(16).toString();
    const hashedpassword = createHmac('sha256',salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password= hashedpassword;

    next();
});
UserSchema.static("matchPassword",async function(email,password){

    //check password and generate token here

    const user = await this.findOne({ email });

    if (!user){ throw new Error("User not found!");}

    const salt = user.salt;
    const hashedpassword = user.password;

    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

    if(hashedpassword !== userProvidedHash)
    {  throw new Error("incorrect Password");}
  
      
    const token = createTokenForUser(user);
    console.log("correct pass ")

    return token;
})

const User = mongoose.model('user',UserSchema)
module.exports = User;  