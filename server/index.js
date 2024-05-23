require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./database/connectdb')
const userRoute = require("./Auth/createUser");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middleware/authentication.js");
const cors = require('cors');
const JWT = require("jsonwebtoken");
const secret = "$uperMan@123";
const PORT=process.env.PORT;

const app = express();
app.use(express.json());

app.use(cors({  origin: 'http://localhost:3000',credentials: true  }));
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.use("/user",userRoute); 

app.use(checkForAuthenticationCookie('token'));

app.get('/',(req,res)=>{
    res.send('hello')
    //user:req:user
})

app.get('/profile' , (req,res)=>{
   
    const { token } = req.cookies;
    if (!token) {
        return res.json({ status:401,error: 'Token not provided' });
    }

    JWT.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.json({ status:401,error: 'Invalid token' });
        }
        console.log('verified');
        res.json(info);
    });
})

const startApp = async() => {
    await connectDB();
    app.listen(PORT,()=>{
        console.log(`Server is listening on port: ${PORT}`);
    })
}
startApp()



