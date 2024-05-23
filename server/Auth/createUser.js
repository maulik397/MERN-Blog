
const { Router } = require("express");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = Router();
const secret = "$uperMan@123";
router.post("/signup", async(req,res)=>{

    const{username,email,password} = req.body;
    try{
        await User.create({
        username,
        email,
        password,
    })
    console.log('user created');
}   
catch(e){
    console.log(e);
}
    return res.status(201).json({ message: 'User created successfully' });
})

router.post('/login',async(req,res)=>{
    const{email,password} =req.body;
    try{    
    const token  = await User.matchPassword(email,password);

    if (!token) {
        return res.status(400).json({ message: 'no user found' });
      }
  
      res.cookie('token', token,{ secure:true, httpOnly: false,sameSite:'none' });
      
      return res.status(200).json({ message: 'Login successful ' });
    }
    catch(error)
    {
        return res.status(401).json({ message: 'token is not valid' });
    }
})
/*
router.get('/profile',async(req,res)=>{
    const { token } = req.cookies;
   
    console.log('Token:', token); 
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        console.log('verified');
        res.json(info);
    });

}
)*/

module.exports = router;