const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionDesc: String,
  upvote: {
    type: Number,
    default: 0
  },
  hasUpvoted: {
    type: Boolean,
    default: false
  },
  downvote: {
    type: Number,
    default: 0
  },
  hasDownvoted: {
    type: Boolean,
    default: false
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
