const express = require('express')
const Task = require('../models/task.js')
const router = new express.Router()


// create
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// read many
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// read one
router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

// delete
router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router