const exp = require("express")
const router = exp.Router()




router.all("*", (req, res) => {
    res.render('./404page.ejs')
})

module.exports = router
