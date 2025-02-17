const express = require('express');
const userRouter = express.Router();
const z = require('zod')
const bcrypt = require('bcrypt')
const { userModel , purchaseModel , courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const { usermiddle } = require('../middleware/user');
const JWT_USER = "hi"


const saltRounds = 10; // for bcrypt


userRouter.post("/signup", async function(req, res) {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new admin user in the database
        await userModel.create({
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
})

userRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ email: email });
        
        if (user) {
            // Compare the password
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (passwordMatch) {
                // Generate a JWT token if the password matches
                const token = jwt.sign({ id: user._id, id: user._id }, JWT_USER);
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
});
userRouter.get("/purchases", usermiddle ,  async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})
module.exports = { userRouter };