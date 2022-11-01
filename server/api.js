/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

// without a system for users, we'll have to hardcode our user name
const MY_NAME = "Test User";

const usermap = new Map();
usermap.set("afsaff","123123");


const data = {
  stories: [
    {
      _id: 0,
      creator_name: "Alice",
      content: "Anyone for software engineering course's group?"
    }
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Bob",
      parent: 0,
      content: "Maybe I could?",
    }
  ],
};

const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API! In its own file!" });
});

router.get("/stories", (req, res) => {
  // send back all of the stories!
  res.send(data.stories);
});

router.get("/comment", (req, res) => {
  const filteredComments = data.comments.filter(
    (comment) => comment.parent == req.query.parent);
  res.send(filteredComments)
});

router.post("/story", (req, res) => {
  const newStory = {
    _id: data.stories.length,
    creator_name: MY_NAME,
    content: req.body.content,
  };

  data.stories.push(newStory);
  res.send(newStory);
});

router.post("/comment", (req, res) => {
  const newComment = {
    _id: data.comments.length,
    creator_name: MY_NAME,
    parent: req.body.parent,
    content: req.body.content,
  };

  data.comments.push(newComment);
  res.send(newComment);
});

router.post("/login", (req, res) => {
  if(req.body.password == usermap.get(req.body.username)){
    console.log("OK");
    res.send({result : "OK"});
  }
  else{
    console.log("Wrong pwd");
    res.send({result : "Wrong"});
  }
});

router.post("/register", (req, res) => {
  if(usermap.has(req.body.username) == false){
    usermap.set(req.body.username,req.body.password);
    console.log("Register Done");
    res.send({result : "OK"});
  }
  else{
    console.log("Already Exist");
    res.send({result : "Wrong"});
  }
});

// similar to our other catch all route in server.js,
// let's add a backup route for bad /api routes
router.all("*", (req, res) => {
  console.log(`API Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ message: "API Route not found" });
});

module.exports = router;
