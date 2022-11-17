const User = require('../models/user-models')
const db = require('../controllers/connect')
const mongoose = require('mongoose');
/*
test('My 1 first test', () => {
    expect(Math.max(1, 5, 10)).toBe(5);
});
*/

test('Connect to db',() => {
    const res = db()
    expect(res).toBe(true)
})

test('User create test', async () => {
    db()
    let email = 'test@gmail.com'
    let password = 'test'
    let firstName = 'Test'
    let secondName = 'Secondary'
    const testUser = new User({email,password,firstName,secondName})
    await testUser.save()
    const foundUser = await User.find({email:'test@gmail.com'})
    expect(testUser.password).toBe('test')
    expect(testUser.firstName).toBe('Test')
    expect(testUser.secondName).toBe('Secondary')
});

test ('Delete user test',async()=>{
    db()
    const res = await User.deleteOne({email:'test@gmail.com'});
    expect(res.acknowledged).toBe(true)
})



