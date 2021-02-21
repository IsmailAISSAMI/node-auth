const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// Create users
router.post('/users', async (req, res)=> {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Read users 
router.get('/users', async (req,res)=>{
    try{
        const users = await User.find({}) 
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

// Read user 
router.get('/users/:id', async (req,res)=>{
    const _id = req.params.id 
    try{
        const user = await User.findById(_id)
        if(!user){
            return escape.status(404).send({error: "User not found! try again."})
        }
        res.status(200).send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

// Update user 
router.patch('/users/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["first_name", "last_name", "age", "email", "password"] 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates!"})
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send({error: "User not found! try again."})
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete 
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({error: "User not found! try again."})
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router