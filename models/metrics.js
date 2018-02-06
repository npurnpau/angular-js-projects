var mongoose  = require('mongoose');
var Q = require("q");

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
module.exports.getBuilds = function(callback, limit){
    Build.find(callback).limit(limit);
}

module.exports.getByBuildNumber = function(build_no,callback){
    Build.find({'build_no':build_no},callback);
} 


module.exports.getBuilds = function(callback, limit){
    Build.find(callback).limit(limit);
}


module.exports.getAllBuildNumbers = function(callback){
    Build.distinct('build_no',callback);
    
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
    var deferred = Q.defer();
    Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"XTHJTH"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data1){

        if(data1 && data1.length > 0){
           // console.log(data1);
            XTHJTH_total = data1[0].total_tests;
        }
        else{
        XTHJTH_total = 0;
        }
        Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"XTHJTH"}} ,{ $group: { _id: null, total_tests_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data2){
            if(data2  && data2.length > 0){
           // console.log(data2);
            XTHJTH_passed = data2[0].total_tests_passed;
            }
            else{
                XTHJTH_passed = 0;
            }
            Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"XTHJTH"}} ,{ $group: { _id: null, total_tests_failed: { $sum: '$total_tests_failed'}} } ]).then(function(data3){
                if(data3  && data3.length > 0){
                   // console.log(data3);  
                    XTHJTH_failed =  data3[0].total_tests_failed;
                }
                else{
                    XTHJTH_failed = 0;
                }
                Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"UI"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data4){
                    if(data4  && data4.length > 0){
                        //console.log(data4);
                        UI_total = data4[0].total_tests;
                    }
                     else{
                        UI_total = 0;
                     }
                     
                     Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"UI"}} ,{ $group: { _id: null, total_tests_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data5){
                        if(data5  && data5.length > 0){
                           // console.log(data5);
                            UI_passed = data5[0].total_tests_passed;
                        }
                        else{
                            UI_passed = 0;
                        }
                       
                        Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"UI"}} ,{ $group: { _id: null, total_tests_failed: { $sum: '$total_tests_failed'}} } ]).then(function(data6){
                            if(data6  && data6.length > 0){
                               // console.log(data6);
                                UI_failed =  data6[0].total_tests_failed;
                            }
                            else{
                                UI_failed = 0;
                            }
                            
                            Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"RTEST"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data7){
                                if(data7  && data7.length > 0){
                                   // console.log(data7)
                                    REST_total = data7[0].total_tests;
                                }
                                else{
                                    REST_total = 0;
                                }
                                
                                Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"RTEST"}} ,{ $group: { _id: null, total_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data8){
                                    if(data8  && data8.length > 0){
                                        //console.log(data8);
                                        REST_passed = data8[0].total_passed;
                                    }
                                    else{
                                        REST_passed = 0;
                                    }
                                    
                                    Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"RTEST"}} ,{ $group: { _id: null, total_failed: { $sum: '$total_tests_failed'}} } ]).then(function(data9){
                                        if(data9 && data9.length > 0){
                                            //console.log(data9);
                                            REST_failed = data9[0].total_failed;
                                        }
                                        else{
                                            REST_failed = 0;
                                        }
                                        
                                         Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"NEWUI"}} ,{ $group: { _id: null, total_tests: { $sum: '$total_tests_count'}} } ]).then(function(data10){
                                           // console.log(data10);
                                             if(data10.length > 0){
                                                 console.log(data10);
                                                PROTRACTOR_total = data10[0].total_tests;
                                             }
                                             else{
                                                PROTRACTOR_total = 0;
                                             }
                                             
                                             Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"NEWUI"}} ,{ $group: { _id: null, total_tests_passed: { $sum: '$total_tests_passed'}} } ]).then(function(data11){
                                                //console.log(data11);
                                                if(data11  && data11.length > 0){
                                                    console.log(data11);
                                                    PROTRACTOR_passed = data11[0].total_tests_passed;
                                                }
                                                 
                                                 else{
                                                    PROTRACTOR_passed = 0;
                                                 }
                                                 
                                                 Build.aggregate([ { $match:  {'build_no':build_no,'test_type':"NEWUI"}} ,{ $group: { _id: null, total_tests_failed: { $sum: '$total_tests_failed'}} } ]).then(function(data12){
                                                   // console.log(data12);
                                                    if(data12  && data12.length > 0){
                                                        PROTRACTOR_failed = data12[0].total_tests_failed;
                                                    }
                                                      else{
                                                      PROTRACTOR_failed = 0;    
                                                      }
                                                     // console.log(PROTRACTOR_failed);
                                                     // console.log(PROTRACTOR_passed);
                                                      db.collection("metrics").update( { 'build_no': build_no},
													   	{ build_no:build_no,XTHJTH_total: XTHJTH_total, XTHJTH_passed: XTHJTH_passed, XTHJTH_failed: XTHJTH_failed,
                                                        UI_total:UI_total,UI_passed:UI_passed,UI_failed:UI_failed, REST_total:REST_total,REST_passed:REST_passed,REST_failed, 
                                                        PROTRACTOR_total:PROTRACTOR_total,PROTRACTOR_passed:PROTRACTOR_passed,PROTRACTOR_failed:PROTRACTOR_failed },
                                                       { upsert: true } ); 
                                                       
                                                    //    db.collection("metrics").insert( 
                                                    //    { build_no:build_no,XTHJTH_total: XTHJTH_total, XTHJTH_passed: XTHJTH_passed, XTHJTH_failed: XTHJTH_failed,
                                                    // UI_total:UI_total,UI_passed:UI_passed,UI_failed:UI_failed, REST_total:REST_total,REST_passed:REST_passed,REST_failed, 
                                                    // PROTRACTOR_total:PROTRACTOR_total,PROTRACTOR_passed:PROTRACTOR_passed,PROTRACTOR_failed:PROTRACTOR_failed }
                                                    // ); 

                                                     callback("",{ build_no:build_no,XTHJTH_total: XTHJTH_total, XTHJTH_passed: XTHJTH_passed, XTHJTH_failed: XTHJTH_failed,
                                                                   UI_total:UI_total,UI_passed:UI_passed,UI_failed:UI_failed,
                                                                   REST_total:REST_total,REST_passed:REST_passed,REST_failed,
                                                                   PROTRACTOR_total:PROTRACTOR_total,PROTRACTOR_passed:PROTRACTOR_passed,PROTRACTOR_failed:PROTRACTOR_failed
                                                                });
                                                                deferred.resolve("inserted");
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
        return deferred.promise;
    }




   
    