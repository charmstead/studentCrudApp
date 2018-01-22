const sqMongoose = require('mongoose');
const sqSchema = sqMongoose.Schema;


const sqStudentSchema = new sqSchema({

            name:String,
            matricNumber:String,
            age:Number,
            department:{
                title:String,
            },
            address:{
                street:String,
                city:String,
                state:String,
                zipCode:String
            },
            coursesOffered:[{type:sqSchema.Types.ObjectId, ref:'Course'}],
            createdAt: {type:Date, default:Date.now}
});

module.exports = sqMongoose.model('Student', sqStudentSchema);