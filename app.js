const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const ejs = require ('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");

app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/WikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


////////////////// Making Request to all articles ///////////////////////

app.route("/articles")
.get(function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }else{
            res.send(err);
        }
    });
})
.post(function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article.");
        }else{
            res.send(err);
        }
    });
})
.delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles.");
        }else{
            res.send(err);
        }
    });
});


////////////////// Making Request to a specific article ///////////////////////





app.listen(3000, function(){
    console.log("Server started on PORT 3000");
});