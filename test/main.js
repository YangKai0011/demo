var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
app.use(function(req, res, next){
    console.log("request id : " + req.url);
    console.log("request date: "+ new Date());
    next();
});

app.use(function(req, res, next){
    var filePath = path.join(__dirname,"public",req.url);
    fs.stat(filePath,function(err,data){
        if(err){
            next;
            return;
        }if(data.isFile()){
            res.sendFile(filePath);
        }
        else{
            next();
        }
    });
});
app.use(function(req, res){
    res.status(404).send("no file");
});

app.listen(8080);