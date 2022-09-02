const express = require('express')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')


// runs mongoose.js so that mongoose connects to the database
require('./db/mongoose.js')


// create express application
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

app.use((req, res, next) => {
    res.status(503).send("Under maintenance!")
})


// parse incoming JSON for creating users
app.use(express.json())

// use routers
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})





const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction()

