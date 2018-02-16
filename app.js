var express  = require('express');
var app = express();
// var Q = require("q");
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
const MongoClient = require('mongodb').MongoClient;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://10.131.227.154/Final-crt');

Build = require('./models/metrics');
Metrics = require('./models/results');
var db = mongoose.connection;
var fs = require('fs');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/builds', function(req,res){
    Build.getBuilds(function(err,ds){
        if(err){
            throw err;
        }
        res.json(ds);
    })

});

//app.get('/api/staticSprints',function(req,res){
//    Build.getStaticSprintData(function(err,sprints){
//        if(err){
//            throw err;
//        }
//        res.json(sprints);
//    });
//});

app.get('/api/metrics', function(req,res){
    Metrics.getTotalMetrics(function(err,metrics){
        if(err){
            throw err;
        }
        res.json(metrics);
//        console.log(metrics);
    })
});

app.get('/api/metricsLatest', function(req,res){
    Metrics.getLatestMetric(function(err,metrics){
        if(err){
            throw err;
        }
        res.json(metrics);
//        console.log(metrics);
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
//        console.log(builds);
        res.json(builds);
    });
 }); 

app.get('/api/buildNumberList',function(req,res){
    Build.getAllBuildNumbers(function(err,builds){
        if(err){
            throw err;
        }
        var list = builds;
        for(var i =0 ; i< list.length ; i++){
             Build.getTotalTestsForAllTestTypes(list[i], function(err,builds){
                if(err){
                    throw err;
                }
            });
        }

        Metrics.getTotalMetrics(function(err,metrics){
            if(err){
                throw err;
            }
            res.json(metrics);
            console.log(metrics);
        });
        
    });
}); 

app.get('/api/sprintMetrics', function(req,res){

    Build.getLatestBuildNumber(function(err,max_build){
        if(err){
            throw err;
        }
        var obj = JSON.stringify(max_build);
        var build_no = obj.split(":")[1].replace("}]","").replace("\"","").replace("\"","");
//        console.log(build_no);
        var sprint = 'Current Sprint';
        var release = '15.4';
        var pi = 'Holiday';
        Build.insertLatestBuildNumber(release, pi, sprint, build_no, function(err,builds){
            if(err){
                throw err;
            }
        });

        Build.getSprintMetric(function(err,metrics){
            if(err){
                throw err;
            }
            metrics.sort(function(a, b) {
                return a.build_no < b.build_no;
            });
//            metrics.sort();
            res.json(metrics);
        });
    });
});

  app.put('/api/updateComments',function(req,res){
  console.log(req.body.build_no + '    '+ req.body.comment);

    Build.updateComments(req.body.build_no, req.body.comment, function(err){
        if(err){
            throw err;
        }
        res.json();
    });
 });




app.listen(3000);
console.log("running on port 3000");
