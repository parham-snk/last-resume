const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const log = require("./utility/log")
const autobind = require("auto-bind")
const path = require("path")
const multer = require("multer")
const fs = require("fs")

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
        app.set('view engin', 'ejs')
        app.set("views", path.join(__dirname, "resources"))
        app.use("/public", express.static(path.join(__dirname, 'public')))
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