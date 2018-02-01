var mongoose  = require('mongoose');
var total_tests = 0;

// Genre Schema
var buildsSchema = mongoose.Schema({

    build_no : {
        type:String,
    },
    total_tests_count : {
        type:Number,
    },
    total_tests_passed:{
        type:Number,
    },
    total_tests_failed:{
        type:Number,
    },
    total_tests_skipped:{
        type:Number,
    },
    database_type:{
        type:String,
    },
    total_execution_time:{
        type:String,
    },
    component_name:{
        type:String,
    }
    ,
    run_date:{
        type:String,
    },
    failed_tests:{
        type:String,
    }
});


var Build = module.exports = mongoose.model('Build',buildsSchema);



// Get Genres

module.exports.getBuilds = function(callback, limit){
    Build.find(callback).limit(limit);
}

// Get metrics based on build number

module.exports.getBuildByNumber = function(build_no,callback){
    Build.findById(build_no,callback);
}


module.exports.getAllTestCases = function(build_no,callback){
    Build.find().forEach(function(data) {
        Builds.update({_id:data._id},{$set:{total_tests_count:parseInt(data.total_tests_count)}});
    })
}
    
module.exports.getFilteredData = function(build_no,component_name,database_type,callback){
    //Build.find({'build_no':build_no},callback);
    console.log(build_no);
    console.log(component_name);
    console.log(database_type);
    Build.find({'build_no':build_no,'database_type':database_type,'component_name':component_name},callback);
    
}

 module.exports.getFilteredData = function(build_no,fieldType,callback){
     //Build.find({'build_no':build_no},callback);
     console.log(build_no);
     console.log(fieldType);
     Build.find({'build_no':build_no,'database_type':database_type,'component_name':component_name},callback);
    
 }


 module.exports.getAggregateData = function(build_no,fieldValue, callback){

        
   
   Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_passed'}} } ], callback);



 }