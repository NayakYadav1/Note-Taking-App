const Note = require("../models/note")
 
const fetchNotes = async (req, res)=> {
    // Find the notes
    const note = await Note.find();

    // Respond with  them
    res.json ({note})
}

const fetchNote = async(req, res)=> {
    // Get id of the url
    const noteId = req.params.id

    // Find the note using that id
    const note = await Note.findById(noteId)

    // Respond with the note
    res.json ({note})
}

const createNote = async (req, res)=>{
    // Get the sent-in data from the request body  
    // const title = req.body.title;
    // const body = req.body.body;
    // console.log(req.body)

    const {title, body} = req.body

    // Create a note with it
    const note = await Note.create({
        title,
        body,
    })

    // Respond with the new note
    res.json({note})
}

const updateNote = async (req, res)=> {
    // Get the id of the url
    const noteId = req.params.id

    // Get the data off the req body
    const {title, body} = req.body

    // Find and update the record
    await Note.findByIdAndUpdate(noteId, {
        title,
        body,
    })

    // Find updated note
    const note = await Note.findById(noteId)

    // Respond with it
    res.json({note})
}

const deleteNote = async (req, res)=> {
    // Get id off url
    const noteId = req.params.id

    // Delete the record
    await Note.deleteOne({id: noteId})

    // Respond in it
    res.json ({success: `Record successfully deleted`});
}

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
}