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

app.get('/notes', async (req, res)=> {
    // Find the notes
    const note = await Note.find();

    // Respond with  them
    res.json ({note:note})
})

app.get('/notes/:id', async(req, res)=> {
    // Get id of the url
    const noteId = req.params.id

    // Find the note using that id
    const note = await Note.findById(noteId)

    // Respond with the note
    res.json ({note:note})
})

app.post('/notes', async (req, res)=>{
    // Get the sent-in data from the request body  
    // const title = req.body.title;
    // const body = req.body.body;
    // console.log(req.body)

    const {title, body} = req.body

    // Create a note with it
    const note = await Note.create({
        title: title,
        body: body,
    })

    // Respond with the new note
    res.json({note:note})
})

app.put('/notes/:id', async (req, res)=> {
    // Get the id of the url
    const noteId = req.params.id

    // Get the data off the req body
    const {title, body} = req.body

    // Find and update the record
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body,
    })

    // Find updated note
    const note = await Note.findById(noteId)

    // Respond with it
    res.json({note:note})
})

// Start the server
app.listen(process.env.PORT)