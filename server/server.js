const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Request for:', req.url);
    console.log('Hello');
    res.end('Hello in console');
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server run on ${PORT}`);
})