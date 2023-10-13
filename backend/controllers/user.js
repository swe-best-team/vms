require('dotenv').config() // for process.env

const jwt = require('jsonwebtoken')

const User = require('../models/user')
const WebToken = require('../models/webToken')

const { resError } = require('../utils')

const { JWT_TOKEN_SECRET } = process.env

exports.getAllUsers = async (req, res) =>
    await User.find()
        .then(users => {
            const safeUsersInfo = users.map(user => user.getSafeInfo())
            return res.json({
                success: true,
                users: safeUsersInfo
            })
        })
        .catch(() => resError(res, 'No users found'))

exports.getUserByEmail = async (req, res) => {
    const { email } = req.query
    return await User.findOne({ email })
        .then(user => {
            if (user.role != 'driver')
                return resError(res, 'No access')

            const safeUserInfo = user.getSafeUserInfo()
            return res.json({
                success: true,
                user: safeUserInfo
            })
        }).catch(() => resError(res, 'No user found'))
}

exports.userCreate = async (req, res) => {
    const { email } = req.body
    const emailFree = await User.isEmailFree(email)
    if (!emailFree)
        return resError(res, 'Email is already taken')

    const fields = { role, password, name, surname, phone, dob } = req.body
    const user = await User({ ...fields })
    return user.save().then(() => {
        console.log(`User ${email} is created`)

        const safeUserInfo = user.getSafeInfo()
        return res.json({
            success: true,
            user: safeUserInfo
        })
    }).catch(() => resError(res, `Failed to create the user ${email}`))
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
        return resError(res, 'cWrong credentials')
    const matched = await user.comparePassword(password)
    if (!matched)
        return resError(res, 'dWrong credentials')

    await WebToken.deleteMany({ owner: user._id })
    const tokenVal = jwt.sign({ owner: user._id }, JWT_TOKEN_SECRET)
    const { iat } = jwt.verify(tokenVal, JWT_TOKEN_SECRET)
    const wToken = await WebToken({
        owner: user._id,
        token: tokenVal,
        createdAt: iat
    })

    const safeUserInfo = user.getSafeInfo()

    return await wToken.save().then(() =>
        res.json({
            success: true,
            user: safeUserInfo,
            jwtToken: tokenVal
        })).catch(() => resError(res, 'Failed to log in'))
}

exports.userLogout = async (req, res) => {
    const { _id } = req.user // from middlewares/validation/user.isLoggedIn()
    await WebToken.deleteMany({ owner: _id })

    return res.json({ success: true })
}

exports.userAuthenticate = async (req, res) => {
    const user = req.user // from middlewares/validation/user.isLoggedIn()

    const safeUserInfo = user.getSafeInfo()
    return res.json({
        success: true,
        user: safeUserInfo
    })
}

exports.userDelete = async (req, res) => {
    const { _id } = req.body

    return User.findByIdAndDelete(_id).then(doc => {
        const { email } = doc
        console.error(`User ${email} is deleted from the DB`)

        return res.json({ success: true })
    }).catch(() => resError(res, 'Failed to delete the user'))
}