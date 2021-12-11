const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const mongoose = require('mongoose')

console.log(process.env);

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex:  true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    console.log("MongoDB connected")
}

module.exports = connectDB