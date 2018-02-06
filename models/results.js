var mongoose  = require('mongoose');
mongoose.connect('mongodb://10.131.227.154/Final-crt');
var db = mongoose.connection;
var metricsSchema = mongoose.Schema({
    build_no : {
        type:String,
    },
    XTHJTH_total : {
        type:Number,
    },
    XTHJTH_passed:{
        type:Number,
    },
    XTHJTH_failed:{
        type:Number,
    },
    PROTRACTOR_total:{
        type:Number,
    },
    PROTRACTOR_passed:{
        type:Number,
    },
    PROTRACTOR_failed:{
        type:Number,
    },
    REST_total:{
        type:Number,
    }
    ,
    REST_passed:{
        type:Number,
    },
    REST_failed:{
        type:Number,
    }
    ,
    UI_total:{
        type:Number,
    }
    ,
    UI_passed:{
        type:Number,
    },
    UI_failed:{
        type:Number,
    }
});

var Metric = module.exports = mongoose.model('Metric',metricsSchema);

// module.exports.getTotalMetrics = function(callback){
//     Metric.find(callback).then(function(data){
//         Metric.find(callback).limit(limit);
//     });
    


    module.exports.getTotalMetrics = function(callback, limit){
        Metric.find(callback).limit(limit);
}
