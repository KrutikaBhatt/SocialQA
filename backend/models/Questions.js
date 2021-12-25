const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  upvote: {
    type: Number,
    default: 0
  },
  downvote: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers"
  },
  tags:{
    type:String,
    default:"Public"
  }
}, {timestamps: true});

module.exports = mongoose.model("Questions", QuestionSchema);
