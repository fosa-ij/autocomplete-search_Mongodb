const express = require('express')
const app = express()
const cors = require('cors')
const homeRoute = require('./routes/home')
const createServer = require('./config/database')
require('dotenv').config({ path: './config/.env' })
const PORT = 8000


// Database Connection
createServer()


// Set Middleware
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


// Set Routes
app.use('/', homeRoute)


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT || PORT}`);
})