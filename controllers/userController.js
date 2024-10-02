const { status } = require('express/lib/response')
const user = require('../models/user.model')
const HttpStatusText = require('../utils/HttpStatusText')
const bcrypt = require('bcryptjs')
const genrateJwt = require('../utils/genrateJwt')


const getAllUsers = async (req, res) => {
    try {
        const query = req.query
        const limit = query.limit || 10
        const page = query.page || 1
        const skip = (page - 1) * limit
        const users = await user.find({}, {
            '__v': false, 'password': false
        }).skip(skip).limit(limit)
        res.status(200).json({ status: HttpStatusText.SUCCESS, data: users })
    } catch (err) {
        res.status(400).json({ status: HttpStatusText.ERROR, data: err })
    }
}


const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const oldUser = await user.findOne({ email: email })
        if (oldUser) {
            return res.status(400).json({ status: HttpStatusText.ERROR, data: "User already exists" })
        }
        const hashed = await bcrypt.hash(password, 10)
        const newUser = new user({ firstName, lastName, email, password: hashed, role, avatar: req.file.filename })
        //jwt token
        const token = await genrateJwt({ email: newUser.email, id: newUser._id, role: newUser.role })
        newUser.token = token
        await newUser.save()
        res.status(201).json({ status: HttpStatusText.SUCCESS, data: newUser })

    } catch (err) {
        res.status(400).json({ status: HttpStatusText.ERROR, data: err })
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        res.status(400).json({ status: HttpStatusText.ERROR, data: "email and password is required" })
    }
    const User = await user.findOne({ email: email })
    if (!User) {
        res.status(400).json({
            status: HttpStatusText.ERROR, data: "Invalid User"
        })
    }
    //fun compare password
    const isPasswordCorrect = await bcrypt.compare(password, User.password)
    if (User && isPasswordCorrect) {
        const token = await genrateJwt({ email: user.email, id: user._id, role: user.role })
        res.status(200).json({ status: HttpStatusText.SUCCESS, data: { token } })
    } else {
        res.status(400).json({ status: HttpStatusText.ERROR, data: "Invalid User" })
    }

}

module.exports = {
    getAllUsers, register, login
}