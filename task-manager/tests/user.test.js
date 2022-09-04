const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../src/app.js')
const User = require('../src/models/user.js')
const mongoose = require('mongoose')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

afterAll(async () => {
    await mongoose.disconnect()
})

// signup test
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Jonah',
        email: 'jonahkim03@gmail.com',
        password: 'jonahkim'
    }).expect(201)

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assert about response
    expect(response.body).toMatchObject({
        user: {
            name: 'Jonah',
            email: 'jonahkim03@gmail.com'
        },
        token: user.tokens[0].token
    })

    // assert password hash
    expect(user.password).not.toBe('jonahkim')
})

// login test
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // assert tokens are equal
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

// login incorrect test
test('Should not login nonexistant user', async () => {
    await request(app).post('/users/login').send({
        email: 'not@gmail.com',
        password: 'badpassword'
    }).expect(400)
})

// get user profile test
test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// get profile for unauthenticated
test('Should not get user profile for unauthenticated', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

// should delete account for user
test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

// should not delete for unauthenticated user
test('Should not delete for unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

// upload avatar test
test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

// update user test
test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Mike2'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Mike2')
})

// invalid update test
test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Philly, USA'
        })
        .expect(400)
})