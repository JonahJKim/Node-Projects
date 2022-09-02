const express = require('express')
const User = require('../models/user.js')

// create router
const router = new express.Router()

// set up routes
// REST API for creating objects 
router.post('/users', async (req, res) => {
    
    

    try {
        const user = new User(req.body)
        await user.save()
        
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()


        res.send({ user, token})
    } catch (e) {
        res.status(400).send()
    }
})



// REST API for getting all objects
router.get('/users', async (req, res) => {
    try {   
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// REST API for getting specific object
router.get('/users/:id', async (req, res) => {
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

// updates user
router.patch('/users/:id', async (req, res) => {
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
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save() 
        
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

// delete user
router.delete('/users/:id', async (req, res) => {
    try {   
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router