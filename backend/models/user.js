const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcrypt')
require('dotenv').config // for process.env

const { BCRYPT_SALT_ROUNDS } = process.env

const userSchema = new Schema({
    // driver || maintainer || admin
    role: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    license: String, // optional
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() }
})

// middleware activated before each save operation
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hashRes = await hash(this.password, parseInt(BCRYPT_SALT_ROUNDS))
            this.password = hashRes
        } catch (err) {
            console.error(`Failed to hash the password of the following user: ${this.email}`)
            return next(err)
        }
    }

    this.updatedAt = Date.now()
    next()
})

userSchema.methods.comparePassword = async function (password) {
    try {
        const result = await compare(password, this.password)
        return result
    } catch (err) {
        console.error('An error ocurred during password compare: ', err.message)
    }
}

userSchema.methods.getSafeInfo = function () {
    const { __v, password, updatedAt, createdAt, ...safeUserInfo } = this._doc
    return safeUserInfo
}

userSchema.statics.isEmailFree = async function (email) {
    try {
        const user = await this.findOne({ email })

        if (user) return false
        return true
    } catch (err) {
        console.error('An error ocurred in User.isEmailFree()', err.message)
        return false
    }
}

module.exports = model('User', userSchema)