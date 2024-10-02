require("colors")

global.loger = (type, msg) => {
    let date = (new Date().getFullYear() + "/" + new Date().getMonth() + "/" + new Date().getDay())
    switch (type) {
        case "alert":
            console.log(` [ ${type} ] :`.yellow + `${date}  `.gray + `${msg}`)
            break
        case "info":
            console.log(` [ ${type} ] :`.blue + `${date}  `.gray + `${msg}`)
            break
        case "danger":
            console.log(` [ ${type} ] :`.red + `${date}  `.gray + `${msg}`)
            break
    }
}