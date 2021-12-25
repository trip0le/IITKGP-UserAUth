const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  QuestionId: Number,
  Program: String,
  Questions: [
    {
      Serial_Number: Number,
      Content: String,
      Line_Number: Number,
      Difficulty: Number,
    }
  ],
  Number_of_Questions : Number,
  Coverage: Number
});


const Data = mongoose.model('Data',DataSchema);
module.exports = Data
