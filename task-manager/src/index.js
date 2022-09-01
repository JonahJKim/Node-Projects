const express = require('express')
const User = require('./models/user.js')
const Task = require('./models/task.js')
// runs mongoose.js so that mongoose connects to the database
require('./db/mongoose.js')


// create express application
const app = express()
const port = process.env.PORT || 3000

// parse incoming JSON for creating users
app.use(express.json())


// REST API for creating objects 
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// REST API for getting all objects
app.get('/users', async (req, res) => {
    try {   
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// REST API for getting specific object
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.send(500).send()
    }
})

app.patch('/users/:id', async (req, res) => {
    // checks if updating invalid key
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

// create
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// read many
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// read one
app.get('/tasks/:id', async (req, res) => {
    _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            res.status(500).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
})

// patch
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const validUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    if (!validUpdate) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        // add allowed updates
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})