// load env variable
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

//  Import dependencies
const express = require('express')
const ConnectToDb = require('./config/ConnectToDb')
const Note = require('./models/note')

// Create an express app
const app = express()

// Configure express app
app.use(express.json())

// Connect to Database
ConnectToDb()

// Routing
app.get('/', (req, res) => {
    res.json({hello: "World"})
})

app.post('/notes', async (req, res)=>{
    // Get the sent-in data from the request body  
    // const title = req.body.title;
    // const body = req.body.body;
    // console.log(req.body)

    const {title, body, author} = req.body

    // Create a note with it
    const note = await Note.create({
        title: title,
        body: body,
        author: author,
    })

    // Respond with the new note
    res.json({note})
})

// Start the server
app.listen(process.env.PORT)