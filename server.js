// load env variable
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

//  Import dependencies
const express = require('express')
const ConnectToDb = require('./config/ConnectToDb')
const notesController = require('./controllers/notesController')

// Create an express app
const app = express()

// Configure express app
app.use(express.json())

// Connect to Database
ConnectToDb()

// Routing
app.get('/notes', notesController.fetchNotes)
app.get('/notes/:id', notesController.fetchNote)
app.post('/notes', notesController.createNote)
app.put('/notes/:id', notesController.updateNote)
app.delete('/notes/:id', notesController.deleteNote)

// Start the server
app.listen(process.env.PORT)