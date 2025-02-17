const { Router } = require("express");
const express = require('express')
const adminRouter = Router();
const jwt = require('jsonwebtoken')
const z = require('zod')
const bcrypt = require('bcrypt')
const { adminModel ,  courseModel} = require('../db');
const JWT_ADMIN ="ysdgf"
const saltRounds = 10; 
const {adminmiddle} = require('../middleware/admin')

const app = express();
app.use(express.json())
adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new admin user in the database
        await adminModel.create({
            email: email,
            password: hashedPassword, // store the hashed password
            firstName: firstName,
            lastName: lastName,
        });

        // Send a success response along with the created admin details (excluding password)
        res.status(201).json({
            success: true,
            message: "Signup successful",

        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const admin = await adminModel.findOne({ email: email });
        
        if (admin) {
            // Compare the password
            const passwordMatch = await bcrypt.compare(password, admin.password);
            
            if (passwordMatch) {
                // Generate a JWT token if the password matches
                const token = jwt.sign({ id: admin._id,}, JWT_ADMIN);
                return res.status(200).json({
                    success: true,
                    message: "Sign-in successful",
                    token: token
                });
            }
        }
        
        // If user is not found or password doesn't match, send failure response
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            success: false,
            message: "An error occurred during sign-in",
            error: error.message
        });
    }
})

adminRouter.post("/course", adminmiddle, async function (req, res) {
    try {
        const adminId = req.userId;
        const { title, description, price, imageUrl } = req.body;

        // Create the course in the database
        const course = await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId // Ensure this matches the schema field
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            courseId: course._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message
        });
    }
});


// {
//     "title":"i am you",
//     "description":"jhdsbf ujdfsh udkrjhg jusdfhn ",
//     "imageUrl":"fgsydhuf ",
//     "price":"635"

// }


adminRouter.put("/course/:id", adminmiddle, async function (req, res) {
    const adminId = req.userId; // Retrieved from middleware
    const { title, description, imageUrl, price } = req.body; // Updated course details
    const courseId = req.params.id; // Extract courseId from URL parameters

    try {
        // Find and update the course, returning the updated document
        const updatedCourse = await courseModel.findOneAndUpdate(
            {
                _id: courseId, 
                creatorId: adminId // Ensure the admin who created the course is the one updating
            },
            {
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            },
            { new: true } // Return the updated document
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        res.json({
            message: "Course updated",
            courseId: updatedCourse._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message
        });
    }
});



// Assuming you're using Express and Mongoose
adminRouter.get("/course/one/:id", adminmiddle, async function (req, res) {
    const courseId = req.params.id; // Extract courseId from URL parameters
    const adminId = req.userId; // Retrieve adminId from middleware

    try {
        // Find the course by ID and ensure that it belongs to the admin
        const course = await courseModel.findOne({
            _id: courseId,
            creatorId: adminId // Ensure the admin who created the course is the one fetching it
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        // Return the course data
        res.json({
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message
        });
    }
});




adminRouter.get("/course/bulk", adminmiddle, async function (req, res) {
    const adminId = req.userId; // Retrieve the admin's ID from the middleware

    try {
        // Find all courses created by the admin
        const courses = await courseModel.find({ creatorId: adminId });

        // Return the courses found
        res.json({ courses });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching courses",
            error: error.message
        });
    }
});


module.exports = {
    adminRouter
}