const exp = require("express")
const router = exp.Router()


const userModel = require("../../http/models/userModel")


router.get('/', (req, res) => {
    res.render('./admin/admin.ejs')
})
router.get('/courses', (req, res) => {
    res.render("./admin/courses.ejs")
})
router.get('/users', async (req, res) => {
    let users = await userModel.getUsers(req, res)
    res.render('./admin/users.ejs', { users })
})
router.all("*", (req, res) => {
    res.render('./404page.ejs')
})
module.exports = router
