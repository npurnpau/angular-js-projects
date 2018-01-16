var mongoose  = require('mongoose');


// Genre Schema
var buildsSchema = mongoose.Schema({

   /* name :{
        type:String,
        required: true
    },
    create_date:{
        type:Date,
        default: Date.now
    }

    */
});


var Build = module.exports = mongoose.model('Build',buildsSchema);

// Get Genres

module.exports.getBuilds = function(callback, limit){
    Build.find(callback).limit(limit);
}

// Get metrics based on build number

module.exports.getBuildByNumber = function(build_no,callback){
    Build.findById(build_no);
}