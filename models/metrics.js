var mongoose  = require('mongoose');
var total_tests = 0;
mongoose.connect('mongodb://10.131.227.154/Final-crt');
var db = mongoose.connection;



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


    Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$'+fieldValue}} } ]).then(function(data){
        db.collection("summaryMetrics").insert(data);
        callback("",data);
    });
        
 }




 


 module.exports.getTotalTestsForAllTestTypes = function(build_no,callback) {
    // var XTHJTH_total;
    // var XTHJTH_passed;
    // var XTHJTH_failed;
    // var UI_total;
    // var UI_passed;
    // var UI_failed;
    // var REST_total;
    // var REST_passed;
    // var REST_failed;
    // var PROTRACTOR_total;
    // var PROTRACTOR_passed;
    // var PROTRACTOR_failed;


    Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"XTHJTH"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data1){
        if(data1){
        XTHJTH_total = data1[0].total_tests;
    }else{
        XTHJTH_total = 0;
    }
        Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"XTHJTH"}} ,{ $group: { _id: null, total_tests_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data2){
            XTHJTH_passed = data2[0].total_tests_passed;
            Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"XTHJTH"}} ,{ $group: { _id: null, total_tests_failed: { $sum: '$total_tests_failed'}} } ]).then(function(data3){
                XTHJTH_failed =  data3[0].total_tests_failed;
                 Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"UI"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data4){
                     UI_total = data4[0].total_tests;
                     Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"UI"}} ,{ $group: { _id: null, total_tests_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data5){
                        UI_passed = data5[0].total_tests_passed;
                        Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"UI"}} ,{ $group: { _id: null, total_tests_failed: { $sum: '$total_tests_failed'}} } ]).then(function(data6){
                            UI_failed =  data6[0].total_tests_failed;
                            Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"RTEST"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data7){
                                REST_total = data7[0].total_tests;
                                Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"RTEST"}} ,{ $group: { _id: null, total_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data8){
                                    REST_passed = data8[0].total_passed;
                                    Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"RTEST"}} ,{ $group: { _id: null, total_failed: { $sum: '$total_tests_failed'}} } ]).then(function(data8){
                                        REST_failed = data8[0].total_failed;
                                         Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"NEWUI"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data10){
                                             PROTRACTOR_total = data10[0].total_tests;
                                             Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"NEWUI"}} ,{ $group: { _id: null, total_tests_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data11){
                                                 PROTRACTOR_passed = data11[0].total_tests_passed;
                                                 Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"NEWUI"}} ,{ $group: { _id: null, total_tests_failed: { $sum: '$total_tests_count'}} } ]).then(function(data12){
                                                     PROTRACTOR_failed = data12[0].total_tests_failed;
                                                     callback("",{ build_no:build_no,XTHJTH_total: XTHJTH_total, XTHJTH_passed: XTHJTH_passed, XTHJTH_failed: XTHJTH_failed,
                                                                   UI_total:UI_total,UI_passed:UI_passed,UI_failed:UI_failed,
                                                                   REST_total:REST_total,REST_passed:REST_passed,REST_failed,
                                                                   PROTRACTOR_total:PROTRACTOR_total,PROTRACTOR_passed:PROTRACTOR_passed,PROTRACTOR_failed:PROTRACTOR_failed
                                                                });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }); 
                        });
                    });
                });
            });
        });
    }




module.exports.getTotalTestsRTests = function(build_no,callback) {

    var resp = "";
     Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data){
         db.collection("summaryMetrics").insert(data);
         resp = data;
         //callback("",data);
         Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_passed'}} } ]).then(function(data){
             db.collection("summaryMetrics").insert(data);
             resp = data;
             //callback("",data);
             Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_failed'}} } ]).then(function(data){
                 db.collection("summaryMetrics").insert(data);
                 resp = data;
                 //callback("",data);
             });
         });
     });
     callback("",resp);
 }

 module.exports.getTotalTestsSeleniumUI = function(build_no,callback) {

    var resp = "";
     Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data){
         db.collection("summaryMetrics").insert(data);
         resp = data;
         //callback("",data);
         Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_passed'}} } ]).then(function(data){
             db.collection("summaryMetrics").insert(data);
             resp = data;
             //callback("",data);
             Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_failed'}} } ]).then(function(data){
                 db.collection("summaryMetrics").insert(data);
                 resp = data;
                 //callback("",data);
             });
         });
     });
     callback("",resp);
 }

 module.exports.getTotalTestsNewUI = function(build_no,callback) {

    var resp = "";
     Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data){
         db.collection("summaryMetrics").insert(data);
         resp = data;
         //callback("",data);
         Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_passed'}} } ]).then(function(data){
             db.collection("summaryMetrics").insert(data);
             resp = data;
             //callback("",data);
             Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_failed'}} } ]).then(function(data){
                 db.collection("summaryMetrics").insert(data);
                 resp = data;
                 //callback("",data);
             });
         });
     });
     callback("",resp);
 }



/*module.exports.getTotalTests = function(build_no,component, callback){

    if(component.cont)
    Build.aggregate([ { $match:  {'build_no':build_no}} ,{ $group: { _id: null, total_tests: { $sum: '$'+fieldValue}} } ]).then(function(data){
        db.collection("summaryMetrics").insert(data);
        callback("",data);
    });
}*/