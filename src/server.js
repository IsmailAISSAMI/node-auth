const express = require('express')
require('./db/db-connection')
const userRouter = require('./routers/users-router')

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`>> Server is up on port ${port}.`)
})
