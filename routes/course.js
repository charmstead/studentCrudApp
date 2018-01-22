var sqExpress = require('express');
var sqRouter = sqExpress.Router();
const sqStudent = require('../models/studentSchema');
const sqCourse = require('../models/courseSchema');


/* GET students listing. */
sqRouter.get("/", (req, res, next) => {


    sqCourse.find((err, course) => {

        if (err) {
            return res.send(err);
        }
        res.send(course);

    });

});


/* CREATE a new post . */
sqRouter.post("/", (req, res, next) => {

    const sqUserId = req.body.userId;


    // creates a new Course object from the schema
    var sqNewCourse = new sqCourse();

    sqNewCourse.title = req.body.title;
    sqNewCourse.description = req.body.description;

    sqNewCourse.save((err,course) => {

        if (err) {
            return res.send(err);
        }

        sqStudent
            .findByIdAndUpdate(sqUserId,
            { "$addToSet": { "coursesOffered": course._id } },
            (err, project) => {

                if (err) {
                    return res.send(err);
                }



                console.log("Student was successfully updated");
                return res.sendStatus(`/student/${sqUserId}`);

            });

    });

});


/* DELETE a particular student listing. */
sqRouter.delete("/:id", (req, res, next) => {

    const sqId = req.params.id;
    const sqUserId = req.body.userId;


    sqStudent
        .findByIdAndUpdate(sqUserId,
        { "$pull": { "coursesOffered": req.id } },//removes the course from user's courses
        (err, project) => {

            if (err) {
                return res.send(err);
            }

            //delete the course from course collection.
            sqCourse.remove({ _id: sqId }, (err, project) => {
                if (err) {
                    return res.send(err);
                }

                console.log("Student was successfully updated");
                return res.redirect(`/student/${sqUserId}`);

            });



        });

});



module.exports = sqRouter;