const Admin = require("../model/admin")
const helper = require("../helper/message")
const jwt = require("jsonwebtoken")
const jwtkey = "ahmadiyyasecretkey"

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const record = await Admin.findOne({ username: username, password: password })
        if (record) {
            jwt.sign({ id: record._id, username: record.username }, jwtkey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    res.json({
                        status: helper.status500,
                        message: helper.message500,
                        error: error.message
                    })
                } else {
                    res.json({
                        status: helper.status200,
                        message: helper.message200,
                        username: record.username,
                        token: token
                    })
                }
            })
        } else {
            res.json({
                status: helper.status401,
                message: helper.message401
            })
        }
    } catch (error) {
        res.json({
            status: helper.status500,
            message: helper.message500,
            error: error.message
        })
    }
}

exports.authentication = (req, res) => {
    const token = req.headers.authorization
    const newToken = token.split(' ')[1]
    try {
        if (newToken === "null") {
            res.json({
                status: helper.status401,
                message: helper.message401,
            })
        } else {
            jwt.verify(newToken, jwtkey, (error, valid) => {
                if (error) {
                    res.json({
                        status: helper.status401,
                        message: helper.message401,
                        error: error.message
                    })
                } else {
                    res.json({
                        status: helper.status200,
                        message: helper.message200,
                    })
                }
            })
        }
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500,
            error: error.message
        })
    }
}

exports.fetchAdmin = async (req, res) => {
    try {
        const record = await Admin.findOne()
        res.json({
            status: helper.status200,
            message: helper.message200,
            data: record,
        })
    } catch (error) {
        res.json({
            status: helper.status500,
            message: helper.message500,
            error: error.message
        })
    }
}

exports.updateAdmin = async (req, res) => {
    const { username, password } = req.body
    try {
        await Admin.findOneAndUpdate({ username: username, password: password })
        res.json({
            status: helper.status200,
            message: helper.message200,
            username: username
        })
    } catch (error) {
        res.json({
            status: helper.status500,
            message: helper.message500,
            error: error.message
        })
    }
}