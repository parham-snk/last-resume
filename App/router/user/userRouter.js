const exp = require("express")
const app = exp()
const router = exp.Router()


router.get('/panel', (req, res) => {
    res.render('./user/index.ejs')
})

router.all("*", (req, res) => {
    res.render("./404page.ejs")
})

module.exports = router