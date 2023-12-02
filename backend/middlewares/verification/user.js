require('dotenv').config() // for process.env

const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const WebToken = require('../../models/webToken')

const { JWT_TOKEN_SECRET } = process.env

const { resError, getBearerToken } = require('../../utils')
const { ROLENAMES } = require('../../utils/constants')

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
        console.log(`${user.email}'s authentication verified`)
        next()
    } catch (err) {
        return resError(res, 'Authentication error')
    }
}

exports.isAdmin = (req, res, next) =>
    isRole(req, res, next, ROLENAMES.admin)

exports.isDriver = (req, res, next) =>
    isRole(req, res, next, ROLENAMES.driver)

exports.isMaintainer = (req, res, next) =>
    isRole(req, res, next, ROLENAMES.maintainer)

exports.isFueler = (req, res, next) =>
    isRole(req, res, next, ROLENAMES.fueler)

const isRole = (req, res, next, role) => {
    const user = req.user // from this.isLoggedIn()
    if (!user.role || user.role != role)
        return resError(res, `${role} authority needed`)

    console.log(`${user.email} is verified to be a ${user.role}`)
    next()
}