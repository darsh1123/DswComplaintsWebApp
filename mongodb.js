const express = require("express");
const app = express();
const http = require("http");
const bcrypt = require("bcrypt");
const port = 3000;

var mongoose = require("mongoose");
const bodyparser = require("body-parser");

var urlencodedParser = bodyparser.urlencoded({ extended: false });
app.use(urlencodedParser);
mongoose.connect(
  "mongodb+srv://DARSH_12345:DARSHGAUTAM_12345@cluster0.5xcqvg4.mongodb.net/?retryWrites=true&w=majority"
);

var contactSchema = new mongoose.Schema({
  Name: String,
  UID: String,
  Email: String,
  Issue: String,
  Description: String,
  Status: String,
});

var Contact = mongoose.model("Contact", contactSchema);

app.post("/2.html", (req, res) => {
  let d = req.body;
  d["Status"] = "Pending";
  var mydata = new Contact(d);
  mydata
    .save()
    .then(() => {
      res.sendFile(__dirname + "/1.html");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
  //res.status(200).render('node3.js');
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/1.html");
});
app.get("/3.html", function (req, res) {
  res.sendFile(__dirname + "/3.html");
});
app.get("/5.html", function (req, res) {
  res.sendFile(__dirname + "/5.html");
});
app.get("/6.html", function (req, res) {
  res.sendFile(__dirname + "/6.html");
});
app.get("/2.html", function (req, res) {
  res.sendFile(__dirname + "/2.html");
});
app.get("/4.html", function (req, res) {
  res.sendFile(__dirname + "/4.html");
});
app.get("/apitable", (req, res) => {
  res.sendFile(__dirname + "/apitable.html");
});

app.get("/update/:complaint_id/:new_status", function (req, res, next) {
  Contact.findOneAndUpdate(
    { _id: req.params.complaint_id },
    {
      $set: {
        Status: req.params.new_status,
      },
    }
  )
    .then((data) => {
      console.log("Data is: " + data);
    })
    .catch((err) => {
      console.log(err);
    });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("done.");
});

app.get("/findall", (req, res) => {
  Contact.find({})
    .then((data) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
    })
    .catch(() => {
      console.log("error showed ");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
