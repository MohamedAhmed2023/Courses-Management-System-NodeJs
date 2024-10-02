const express = require('express')
const app = express()
const cors = require('cors')
const HttpStatusText = require('./utils/HttpStatusText')
app.use(express.json())
require('dotenv').config()
app.use(cors())

//db connection
const mongoose = require("mongoose")
const url = process.env.MONGO_URI;
mongoose.connect(url).then(() => {
    console.log("mongoDB is connected")
})
// static files
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//routes
const coursesRoute = require('./routes/coursesroutes')
const userRoute = require('./routes/userRoutes')
app.use('/api/courses', coursesRoute)
app.use('/api/users', userRoute)

//global middleware for not route
app.all('*', (req, res, next) => {
    res.status(400).json({ status: HttpStatusText.ERROR, message: "This route is not defined" })
})

//Server
const Port = process.env.Port;
app.listen(Port, () => {
    console.log(`Server is running in port ${Port}`)
})
