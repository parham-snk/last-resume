const mongoose = require('mongoose')
const bcrypt = require('../../utility/bctrypt')
const uniqeString = require("unique-string");
const uniqueString = require('unique-string');


let expireTime = (1000 * 60 * 15);
const prototype = new mongoose.Schema({
    name: { type: String },
    username: { type: String },
    password: { type: String },
    mail: { type: String },
    admin: { type: Boolean, default: false },
    courses: { type: Array, default: [] },
    token: String,
    status: Boolean
})


module.exports.addUserNormal = async (req, res) => {
    let model = mongoose.model('users', prototype)
    let { name, username, mail } = req.body
    let password = await bcrypt.hashing((req.body.password))
    let user = new model({
        name, username, password, mail, status: true
    })
    user.save()
        .then(() => {
            let token = uniqueString()
            res.cookie('token', token, { maxAge: expireTime })
            setTimeout(() => {
                user.set({ status: false })
            }, expireTime);
            res.redirect('/user/panel')
        }).catch(err => {
            res.redirect('/auth/register')
        })


}

module.exports.login = async (req, res) => {
    let { username, password } = req.body
    const model = mongoose.model('users', prototype)
    let user = new model()
    model.findOne({ username })
        .then(async user => {
            if (user == undefined) {
                return res.redirect('/auth/login')
            }
            let compare = await (bcrypt.compare(password, user.password))
            if (!user) {
                return res.redirect('/auth/login')
            }
            if (compare == false) {
                return res.redirect('/auth/login')
            } else {

                let token = await (uniqeString())
                user.token = token
                await user.set({
                    token: token,
                    status: true
                })

                user.save()
                res.cookie("token", token, { maxAge: expireTime })
                setTimeout(() => {
                    user.set({ status: false })
                    user.save()
                }, expireTime);
                if (user.admin == true) {
                    return res.redirect('/admin')
                }
                return res.redirect('/user/panel')
            }

        })
}

module.exports.checkToken = async (req, res) => {
    const model = mongoose.model('users', prototype)
    if (req.cookies.token != undefined) {
        return model.findOne({
            token: req.cookies.token
        })
            .then((user) => {
                if (user != undefined) {
                    return true
                }
                return false
            })
            .catch(err => console.log(err))
    } else {
        return false
    }
}


module.exports.getUsers = async (req, res) => {
    const model = mongoose.model('users', prototype)
    return model.find()
        .then(async users => {
            let persons = []
            users.forEach(user => {
                persons.push({
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    mail: user.mail,
                    status: user.status
                })
            })
            return persons
        })
}
