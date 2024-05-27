const mongoose = require('mongoose')
require('dotenv').config()
const DB_URL = process.env.Mongo_URL;
const connectDB = async()=>{
    await mongoose.connect(DB_URL);
    console.log('db connected')
}
module.exports =connectDB