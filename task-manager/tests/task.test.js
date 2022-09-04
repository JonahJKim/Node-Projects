const request = require('supertest')
const Task = require('../src/models/task.js')
const app = require('../src/app.js')
const mongoose = require('mongoose')
const { userOneId, userOne, userTwoId, userTwo, taskOne, setupDatabase } = require('./fixtures/db')
const { response } = require('../src/app.js')

beforeEach(setupDatabase)

afterAll(async () => {
    await mongoose.disconnect()
})

// create task check
test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

// fetch tasks check
test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(response.body.length).toEqual(2)
})

// delete tasks check
test('Shouldn\'t delete task that is user\'s', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    
    const task = await Task.findById(taskOne._id)

    expect(task).not.toBeNull()
})