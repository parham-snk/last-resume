const exp = require("express")
const router = exp.Router()


//routers
const course = require('./courses/courses-router')
const auth = require("./auth/auth-router")

router.get("/", (req, res) => {
    res.render("./index.ejs")
})

router.use('/auth',auth)
router.use('/courses',course)
module.exports = router
