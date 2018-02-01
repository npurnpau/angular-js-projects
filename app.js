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

app.get('/api/count/:_build_no/:_fieldValue',function(req,res){
   var totalTests= null;
    Build.getAggregateData(req.params._build_no,req.params._fieldValue,function(err,builds){
        if(err){
            throw err;
        }
        console.log(builds);
        res.json(builds);
        json
        
        
    });
    
  

});

app.listen(3000);
console.log("running on port 3000");
