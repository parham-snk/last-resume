const exp = require("express")
const router = exp.Router()


//model
const model = require('../../http/models/userModel.js')

router.get('/register', (req, res) => {
    res.render('./auth/register.ejs')
})


router.post('/register', (req, res) => {
    model.addUserNormal(req,res)

})
router.get('/login', (req, res) => {
    res.render("./auth/login.ejs")
})
router.post('/login', (req, res) => {
    model.login(req, res)
})
router.all("*", (req, res) => {
    res.render('./404page.ejs')
})
module.exports = router
