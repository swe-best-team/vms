require('dotenv').config() // for process.env

const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const WebToken = require('../../models/webToken')

const { JWT_TOKEN_SECRET } = process.env

const { resError, getBearerToken } = require('../../utils')

exports.isLoggedIn = async (req, res, next) => {
    const jwtToken = getBearerToken(req)
    if (jwtToken == undefined)
        return resError(res, 'You are not logged in')

    try {
        const { owner } = jwt.verify(jwtToken, JWT_TOKEN_SECRET)
        const wToken = await WebToken.findOne({ owner }, {}, {
            sort: { 'createdAt': -1 }
        })
        if (!wToken && jwtToken != wToken.token)
            return resError(res, 'Your session is expired')

        const user = await User.findOne({ _id: owner })
        if (!user)
            return resError(res, 'User undefined')

        req.user = user
        next()
    } catch (err) {
        return resError(res, 'Authentication error')
    }
}

exports.isAdmin = async (req, res, next) => {
    const user = req.user // from this.isLoggedIn()
    if (!user.role || user.role != 'admin')
        return resError(res, 'Insufficient authority')

    next()
}