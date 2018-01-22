const sqMongoose = require('mongoose');
const sqSchema = sqMongoose.Schema;

const sqCourseSchema = new sqSchema({
    
            title:String,
            description:String,
            createdAt: {type:Date, default:Date.now}
});

module.exports = sqMongoose.model('Course', sqCourseSchema);