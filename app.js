var express  = require('express');
var app = express();
var Q = require("q");
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
const MongoClient = require('mongodb').MongoClient;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://10.131.227.154/Final-crt');

Build = require('./models/metrics');
Metrics = require('./models/results');
var db = mongoose.connection;

app.use(express.static(__dirname+'/client'));

app.get('/api/builds', function(req,res){
    Build.getBuilds(function(err,ds){
        if(err){
            throw err;
        }
        res.json(ds);
    })

});

app.get('/api/metrics', function(req,res){
    Metrics.getTotalMetrics(function(err,metrics){
        if(err){
            throw err;
        }
        res.json(metrics);
        console.log(metrics);
    })
});

app.get('/api/count/:_build_no',function(req,res){
 
     Build.getTotalTestsForAllTestTypes(req.params._build_no,function(err,builds){
         if(err){
             throw err;
         }
         console.log(builds);
         res.json(builds);
     });
  });

  app.get('/api/builds/:_build_no',function(req,res){
    Build.getByBuildNumber(req.params._build_no,function(err,builds){
        if(err){
            throw err;
        }
        console.log(builds);
        res.json(builds);
    });
 }); 

 app.get('/api/buildNumberList',function(req,res){
    Build.getAllBuildNumbers(function(err,builds){
        if(err){
            throw err;
        }
     
        var list = builds;
       // Build.getTotalTestsForAllTestTypes("15.4.0.229");

       var promiseArr = [];

        for(var i =0 ; i<= list.length ; i++){
            promiseArr.push(Build.getTotalTestsForAllTestTypes(list[i]));
         }
         Q.all(promiseArr).then(function(res){
            console.log(res);
         });
        res.json(builds);
    });
 }); 



app.listen(3000);
console.log("running on port 3000");
