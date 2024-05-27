require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./database/connectdb')
const userRoute = require("./Auth/createUser");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middleware/authentication.js");
const cors = require('cors');
const multer = require('multer');
const Post = require('./models/post.js');
const fs = require('fs');
const uploadMiddleware = multer({dest:'./uploads'})
const JWT = require("jsonwebtoken");
const secret = "$uperMan@123";
const PORT=process.env.PORT;

const app = express();
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

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
        
        res.json(info);
    });
})

app.post('/logout',(req,res)=>{
    res.clearCookie('token', { httpOnly: false, secure: true, sameSite: 'none' }).send();
});

app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})
app.put('/post',uploadMiddleware.single('file'), async (req,res) => {

  const {token} = req.cookies;
  const extractUserIdFromToken = (token) => {
    if (!token) {
      return null; // Return null if token is not provided
    }
    
    try {
      const decodedToken = JWT.verify(token, secret);
      return decodedToken._id; // Assuming the user ID is stored in the 'id' field of the decoded token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Return null if there's an error decoding the token
    }
  };
  const userid = extractUserIdFromToken(token); 
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }


  JWT.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    console.log("this is request data of user",id);
    try{
    const postDoc = await Post.findById(id);
    console.log(postDoc)
    
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userid);
    console.log(isAuthor);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (newPath) {
      postDoc.cover = newPath;
    }
    await postDoc.save();
    res.json(postDoc);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
  });

});
app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});
app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{

  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;

  JWT.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info._id,
    });
    res.json(postDoc);
  });

})

    connectDB();
    app.listen(PORT,()=>{
        console.log(`Server is listening on port: ${PORT}`);
    })




