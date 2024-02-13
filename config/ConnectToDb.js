// Load env variable
if (process.env.NODE_ENV != 'production'){
    require("dotenv").config()
} 

const mongoose = require('mongoose')

async function ConnectToDb() {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log({message: "Connected to Database Succesfully"})
    } catch(err){
        console.log({message: "Error while connecting to the database"})
    }
}

module.exports = ConnectToDb;