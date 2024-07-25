'use strict'

const { green } = require("cli-color")
const { initialize_app } = require("./app")
const { createServer } = require("http")

initialize_app().then(app => {
    const server = createServer(app)
    server.listen(app.get("port"), () => {
        console.log(green('======================================'));
        console.log(green('SERVER RUNNING ON PORT ' + app.get("port")));
        console.log(green('======================================'));
    })
}).catch(err => {
    throw new Error(err)
})