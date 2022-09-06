const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const ejs = require ('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");

app.use(express.static("public"));


mongoose.connect("mongoDB://localhost:27107/WikiDB", {newUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);








app.listen(3000, function(){
    console.log("Server started on PORT 3000");
});