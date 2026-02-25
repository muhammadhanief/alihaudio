const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

const dev = false
// Mengarahkan ke folder saat ini (dir) agar Next.js tahu di mana folder .next berada
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(process.env.PORT || 3000, (err) => {
        if (err) throw err
        console.log('> Ready on port ' + (process.env.PORT || 3000))
    })
})