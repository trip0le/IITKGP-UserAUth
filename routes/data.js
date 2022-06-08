const express = require("express");
const router = express.Router();
const Queries = require("../models/Data");

const idx = Math.floor(Math.random()*(8-1+1)+1);;

//get the question details saved in the database
router.route("/").get((req, res) => {
  Queries.aggregate([{
    $match: { QuestionId: idx }
  }
])
    // Queries.aggregate([{$sample:{size:1}}])
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json("Error: " + err));
});

//find question details by id
router.route("/:id").get((req, res) => {
  Queries.findById(req.params.id)
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json("Error: " + err));
});



//add Questions
router.route("/add").post((req, res) => {
  const newQueries = new Queries({

    QuestionId: req.body.QuestionId,
    Program: req.body.Program,
    Questions: [{
      Serial_Number: req.body.Serial_Number,
      Content: req.body.Content,
      Line_Number: req.body.Line_Number,
      Difficulty: req.body.Difficulty
    }],
    Number_of_Questions: req.body.Number_of_Questions,
    Coverage: req.body.Coverage
  });
  newQueries
    .save()
    .then(() => res.json("Question set added"))
    .catch((err) => res.status(400).json("Error:" + err));
});


module.exports = router;