const mongoose = require('mongoose')
// const { MongoClient, ObjectId } = require('mongodb')

// let db,
//     dbName = 'sample_mflix',
//     dbConnectionStr = process.env.DB_STRING,
//     // dbConnectionStr = process.env.DB_STRING_TWO,
//     collection

async function createServer(){
    try{
        const client = await mongoose.connect(process.env.DB_STRING)
        console.log(`MongoDB connected: ${client.connection.host}`);
        // db = client.db(dbName)
        // collection = db.collection('movies')
    } catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports = createServer