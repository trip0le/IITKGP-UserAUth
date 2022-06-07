const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  QuestionId: { type: Number, required: true },
  Program: { type: String, required: true },
  Questions: [
    {
      Serial_Number: { type: Number, required: true },
      Content: { type: String, required: true },
      Line_Number: { type: Number, required: true },
      Difficulty: { type: Number, required: true },
    }
  ],
  Number_of_Questions: { type: Number, required: true },
  Coverage: { type: Number, required: true }
});


const Data = mongoose.model('Data', DataSchema);
module.exports = Data
