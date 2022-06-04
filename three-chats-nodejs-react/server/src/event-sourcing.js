const express = require('express');
const cors = require('cors');
const EventEmitter = require('events')
const PORT = 5000;

const emitter = new EventEmitter();

const app = express()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    emitter.on('newMessage', (message) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    console.log(message);
    emitter.emit('newMessage', message)
    res.status(200)
    res.json({message})
}))

// const intervalData = () => {
//
//     setInterval(() => {
//         const obj = { message: Math.random(), id: Math.random() };
//         emitter.emit('newMessage', obj);
//     }, 1000)
// }
// intervalData();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))