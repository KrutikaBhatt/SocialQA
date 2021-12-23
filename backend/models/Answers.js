const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answer: String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  userDetails: {
    type: Object,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("Answers", AnswerSchema);
