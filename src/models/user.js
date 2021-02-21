const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxLength: 256, 
        minLength: 4
    },
    last_name:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxLength: 256, 
        minLength: 4
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

// Hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


// Credentials check
userSchema.statics.findByCredentials = async (email, password) => {
    // check the email
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login! Email or Password is incorrect.')
    }

    // check the hashed password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login! Email or Password is incorrect.')
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User