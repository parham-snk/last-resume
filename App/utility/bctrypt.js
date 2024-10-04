const bcrypt = require("bcrypt")

module.exports.hashing = async (password) => {
    return bcrypt.hash(password, 15)
        .then(password => {
            return password
        }).catch(err => {
            console.log(err)
        })
}

module.exports.compare = async (password, realPassword) => {
    return await bcrypt.compare(password, realPassword)
        .then(result => {
            return result
        })
}