const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const log = require("./utility/log")
const autobind = require("auto-bind")
const path = require("path")
const multer = require("multer")
const fs = require("fs")
const expressSesiion = require("express-session")
const mongodbStore = require("connect-mongo")
const cookieParser = require("cookie-parser")
//utility
const logger = global.log

module.exports = new class Server {
    constructor() {
        this.port = 8080
        this.configServer()
        this.configDataBase()
        this.setConfigs()
        this.configRouter()
        autobind(this)
    }
    configServer() {
        app.listen(this.port, err => err ? global.loger('danger', err) : global.loger('info', 'Server'.blue + ' is Online on  ' + ("http://localhost:" + this.port).underline.blue))
    }
    configDataBase() {
        mongoose.connect("mongodb://127.0.0.1:27017/resume")
            .then(() => {
                global.loger("info", "DataBase".blue + " is Online")
            }).catch(err => global.loger('danger', err))
    }
    setConfigs() {
        app.use(expressSesiion({
            secret: 'parhan',
            cookie: {
                maxAge: 1000 * 5,
                httpOnly: true
            },
            saveUninitialized: true,
            resave: true,
            store: mongodbStore.create(
                {
                    mongoUrl: 'mongodb://127.0.0.1:27017/resume'
                }
            )
        }))
        app.set('view engin', 'ejs')
        app.set("views", path.join(__dirname, "resources"))
        app.use("/public", express.static(path.join(__dirname, 'public')))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(cookieParser("parham"))
        app.use(multer({
            Storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    let filePath = path.join(__dirname, "upload", req.body.name)
                    if (fs.existsSync(filePath)) {
                        return cb(null, filePath)
                    }
                    fs.mkdir(filePath, err => err ? console.log(err) : null)
                    return cb(null, filePath)
                },
                filename: (req, file, cb) => {
                    cb(file.originalname)
                }
            })
        }).array("course-img"))


    }
    configRouter() {
        app.use(require("./router/router.js"))
    }
}