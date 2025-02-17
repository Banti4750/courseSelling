const express = require('express')
const monogose = require('mongoose')
const jwt = require('jsonwebtoken')
const {usersmodel,couresmodel,adminmodel,purchesmodel} = './db';
const { userRouter } = require("./routes/user");
const { createCourseRoutes } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const cors = require('cors')
require('dotenv').config();
const app = express();
app.use(cors())
app.use(express.json())



app.use("/api/user" , userRouter)
app.use("/api/course", createCourseRoutes);
app.use("/api/admin", adminRouter);


async function main() {
    console.log("connected database")
    await monogose.connect(process.env.DB_URI);
    app.listen(3000);
    console.log("listening on port 3000")
}

main()