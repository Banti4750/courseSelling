const express = require('express');
const createCourseRoutes = express.Router();
const { usermiddle } = require('../middleware/user')
const {purchaseModel , courseModel} = require('../db');

const app = express();
app.use(express.json())

createCourseRoutes.post("/purchase", usermiddle, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    // should check that the user has actually paid the price
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
})



createCourseRoutes.get("/preview", async function (req, res) {
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})



module.exports = { createCourseRoutes };