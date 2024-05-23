const mongoose = require('mongoose')
const PostSchema =new mongoose.Schema({
title:{ 
    type:String,
    required:true
},
content:{
    type:string,
    required:true
},
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
createdAt:{
    type:Date,
    default :Date.now
}

})

module.exports = mongoose.model('Post',PostSchema)