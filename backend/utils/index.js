exports.resError = (res, message) => {
    console.error('resError', message)
    return res.json({ success: false, message })
}

exports.getBearerToken = (req) => {
    const authHeader = req.headers.authorization
    const wToken = authHeader && authHeader.split(' ')[1]
    return wToken
}