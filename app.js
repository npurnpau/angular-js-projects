

var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
const MongoClient = require('mongodb').MongoClient;
//mongoose.connect('mongodb://localhost/final_CRT');
mongoose.connect('mongodb://10.131.227.154/Final-crt');
Genre = require('./models/genre');
Build = require('./models/metrics');
var db = mongoose.connection;

app.use(express.static(__dirname+'/client'));

app.get('/api/test', function(req,res){
    res.send('Hello this is sample message 123');
});


app.get('/api/genres', function(req,res){
    Genre.getGenres(function(err,genres){
        if(err){
            throw err;
        }
        res.json(genres);
    })

})

app.get('/api/builds', function(req,res){
    Build.getBuilds(function(err,builds){
        if(err){
            throw err;
        }
        res.json(builds);
    })

});


app.get('/api/builds/:_build_no', function(req,res){
    Build.getBuildByNumber(req.params_build_no,function(err,builds){
        if(err){
            throw err;
        }
        res.json(builds);
    })

});



app.listen(3000);
console.log("running on port 3000");
