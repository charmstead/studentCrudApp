var sqExpress = require('express');
var sqRouter = sqExpress.Router();
const sqStudent = require('../models/studentSchema');
const sqCourse = require('../models/courseSchema');



/* GET a particular student listing. */
sqRouter.get("/:id", (req, res, next) => {

    var sqId = req.params.id;

    sqStudent.findOne({"_id":sqId})
        .populate('coursesOffered')
        .exec((err, student) => {
            if (err) {
                return res.send(err);
            }
            console.log(student);
            res.send(student);

        });

});


/* DELETE a particular student listing. */
sqRouter.delete("/:id", (req, res, next) => {

    var sqId = req.params.id;

    sqStudent.remove({ _id: sqId }, function (err, student) {
        if (err) {
            return res.send(err);
        }

        res.sendStatus(200);

    });

});


/* UPDATE a particular student listing. */
sqRouter.put("/:id", (req, res, next) => {

    console.log(req.body.name);
    const sqId = req.params.id;
    const sqName = req.body.name;
    const sqMatricNumber = req.body.matricNumber;
    const sqDept = req.body.department.title;

    const sqAge = req.body.age;
 
    const sqAddress = req.body.address;


    sqStudent.findByIdAndUpdate(sqId, { $set: { name: sqName, matricNumber: sqMatricNumber, age: sqAge, address: sqAddress, 'department.title':sqDept } },
        function (err, student) {
            if (err) {
                return res.send(err);
            }

            res.sendStatus(200);

        });

});

/* GET students listing. */
sqRouter.get("/", (req, res, next) => {
    
    
        sqStudent.find()
            .populate('coursesOffered')
            .exec((err, students) => {
                if (err) {
                    return res.send(err);
                }
                res.json(students);
    
            });
    
    });
    
    /* CREATE a new students listing. */
    sqRouter.post("/", (req, res, next) => {
    
       
    
        const sqAddress = req.body.address;
    
        // creates a new student object from the schema
        var sqNewStudent = new sqStudent();
    
        sqNewStudent.name = req.body.name;
        sqNewStudent.matricNumber = req.body.matricNumber;
        sqNewStudent.age = req.body.age;
        sqNewStudent.address = sqAddress;
        sqNewStudent.department= req.body.department;
    
        sqNewStudent.save((err,student) => {
            if (err) {
    
                return res.send(err);
            }
    
            console.log("Student was successfully created");
            res.send(student);
    
        });
    
    });
    
module.exports = sqRouter;