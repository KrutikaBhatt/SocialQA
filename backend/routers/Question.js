const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const questionDB = require("../models/Questions");
const isAuthenticated = require("../controller/requestAuthenticator");
const Answers = require("../models/Answers");

router.post("/", async (req, res) => {
  console.log(req.body.userDetails);
  console.log(typeof req.body.userDetails);
  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        userId: req.body.userId,
        tags : req.body.tag
      })
      .then(() => {
        res.status(201).send({
          message: "Question added successfully",
          status: true,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format",
          status: false,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
 
  questionDB.aggregate([
    {
      $lookup: {
          from: "answers", // collection to join
          localField: "_id",//field from the input documents
          foreignField: "questionId",//field from the documents of the "from" collection
          as: "allAnswers"// output array field
      }
  },
  {
    $lookup: {
        from: "users", // collection to join
        localField: "userId",//field from the input documents
        foreignField: "_id",//field from the documents of the "from" collection
        as: "userDetails"// output array field
    }
}
  ]).exec().then((doc) => {
    res.status(200).send(doc)
  })
});


router.get("/:id", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  questionDB.aggregate([
    {
      $match: {userId: mongoose.Types.ObjectId(req.params.id) }
    },
    {
      $lookup: {
          from: "answers", // collection to join
          localField: "_id",//field from the input documents
          foreignField: "questionId",//field from the documents of the "from" collection
          as: "allAnswers"// output array field
      }
  },
  {
    $lookup: {
        from: "users", // collection to join
        localField: "userId",//field from the input documents
        foreignField: "_id",//field from the documents of the "from" collection
        as: "userDetails"// output array field
    }
},
  ]).exec().then((doc) => {
    res.status(200).send(doc)
  })
});

router.put("/upvote/:qid",async(req,res) =>{
  try {
    
    const id = req.params.qid;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with this id - ${id}`);
    }

    const requiredPost = await questionDB.findById(id);
    if(requiredPost.hasUpvoted){
      return res.status(201).send(`Post has already been upvoted`);
    }
    const updatePost = await questionDB.findByIdAndUpdate(id,{$inc: {'upvote':1}, hasUpvoted: true},{new:true});
    res.status(200).json(updatePost);
  
  } catch (error) {
    consol.log(error);
    res.status(500).send("Error occured");
  }
})

router.put("/downvote/:qid",async(req,res) =>{
  try {
    
    const id = req.params.qid;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with this id - ${id}`);
    }

    const requiredPost = await questionDB.findById(id);
    if(requiredPost.hasDownvoted){
      return res.status(201).send(`Post has already been downvoted`);
    }
    const updatePost = await questionDB.findByIdAndUpdate(id,{$inc: {'downvote':1}, hasDownvoted: true},{new:true});

    res.status(200).json(updatePost);
  
  } catch (error) {
    consol.log(error);
    res.status(500).send("Error occured");
  }
})


router.delete("/:qid",async(req,res) =>{
  try {
    
    const id = req.params.qid;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with this id - ${id}`);
    }

    await questionDB.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
  
  } catch (error) {
    consol.log(error);
    res.status(500).send("Error occured");
  }
})

router.get("/find/:name",async(req,res)=>{
  try {
    const error = {
      message: "Error in retrieving blogs",
      error: "Bad Request",
    };
   
    questionDB.aggregate([
      {$match:{tags:req.params.name}},
      {
        $lookup: {
            from: "answers", // collection to join
            localField: "_id",//field from the input documents
            foreignField: "questionId",//field from the documents of the "from" collection
            as: "allAnswers"// output array field
        }
    },
    {
      $lookup: {
          from: "users", // collection to join
          localField: "userId",//field from the input documents
          foreignField: "_id",//field from the documents of the "from" collection
          as: "userDetails"// output array field
      }
  }
    ]).exec().then((doc) => {
      res.status(200).send(doc)
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send("Some Internal error occurred");
  }
})

module.exports = router;