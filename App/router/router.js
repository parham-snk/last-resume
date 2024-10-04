const exp = require("express")
const router = exp.Router()
const app = exp()

//routers
const course = require('./courses/courses-router')
const auth = require("./auth/auth-router")
const admin = require("./admin/admin-router")
const user = require("./user/userRouter")
//models
const userModel = require("../http/models/userModel")

router.get("/", (req, res) => {
    return res.render("./index.ejs")
})
let checkToken = (async (req, res, next) => {
    let auth = await (userModel.checkToken(req, res))
    if (auth == true) {
        return next()
    }
    res.redirect('/auth/login')
})


router.use('/auth', auth)
router.use('/admin', checkToken, admin)
router.use('/courses', course)
router.use('/user',checkToken,user)


router.all("*", (req, res) => {
    res.status(404)
    res.render('./404page.ejs')
})
module.exports = router
