var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
const MongoClient = require('mongodb').MongoClient;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://10.131.227.154/Final-crt');
Genre = require('./models/genre');
Build = require('./models/metrics');
var db = mongoose.connection;

var total_jthxth = "";
var jthxth_passed = "";
var jthxth_failed = "";
var jthxth_passPer = "";

var total_rtests = "";
var rtests_passed = "";
var rtests_failed = "";
var rtests_passPer = "";

var total_seleniumUI = "";
var seleniumUI_passed = "";
var seleniumUI_failed = "";
var seleiumUI_passPer = "";

var total_protractorUI = "";
var protractorUI_passed = "";
var protractorUI_failed = "";
var protractorUI_passPer = "";


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


app.get('/api/builds/:build_no', function(req,res){
    Build.getBuildByNumber(req.params.build_no,function(err,builds){
        if(err){
            throw err;
        }
        res.json(builds);
    })

});

app.get('/api/builds/:_build_no/:_component_name/:_database_type', function(req,res){
    Build.getFilteredData(req.params._build_no,req.params._component_name,req.params._database_type,function(err,builds){
        if(err){
            throw err;
        }
        res.json(builds);
    })

}); 

// app.get('/api/builds/count/:_build_no/:_fieldType',function(req,res){
//     Build.getAllTestsCount(req.params._build_no,req.params._fieldType,function(err,builds){
//         if(err){
//             throw err;
//         }
//         res.json(builds);
//     })

// });

app.get('/api/builds/count',function(req,res){
    Build.getAllTestsCount(function(err,builds){
        if(err){
            throw err;
        }
        res.json(builds);
    })

});

app.get('/api/ALL',function(req,res){
    Build.getAllTestsCount(function(err,builds){
        if(err){
            throw err;
        }
        res.json(builds);
    })

});


app.get('/api/aggregate/:_build_no/:_fieldValue',function(req,res){
   var totalTests= null;
    Build.getAggregateData(req.params._build_no,req.params._fieldValue,function(err,builds){
        if(err){
            throw err;
        }
        console.log(builds);
        res.json(builds);
    });
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


 app.get('/api/count/:_build_no/:_test_type',function(req,res){
 
    Build.getTotalTestBasedOnTestType(req.params._build_no,req.params._test_type,function(err,builds){
        if(err){
            throw err;
        }
        console.log(builds);
        res.json(builds);
    });
 });

app.listen(3000);
console.log("running on port 3000");
