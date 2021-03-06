const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId} = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 8000

let db, 
    dbName = 'sample_mflix',
    dbConnectionStr = process.env.DB_STRING,
    // dbConnectionStr = process.env.DB_STRING_TWO,
    collection

async function createServer(){
    try{
        let client = await MongoClient.connect(dbConnectionStr)
        console.log('Connected to Database');
        db = client.db(dbName)
        collection = db.collection('movies')
    } catch(err){
        console.error(err);
    }

    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(cors())

    app.get('/search', async (request, response) => {
        try{
            let result = await collection.aggregate([
                {
                    "$search" : {
                        "autocomplete" : {
                            "query" :  `${request.query.query}`,
                            "path": "title", 
                            "fuzzy": {
                                "maxEdits": 2,
                                "prefixLength": 3
                            }
                        }
                    }
                }
            ]).toArray()
            response.send(result)

        } catch(error){
            console.error(err);
            response.status(500).send({message: error.message})
        }
    })

    app.get('/get/:id', async (request, response) => {
        try{
            let result = await collection.findOne({
                '_id': ObjectId(request.params.id)
            })
            response.send(result)
        } catch(error){
            response.status(500).send({message: error.message})
        }
    })

    // app.get('/', (req, res) => {
    //     res.sendFile(__dirname + '/index.html')
    // })

    app.listen(process.env.PORT || PORT, () => {
        console.log('Server is running...');
    })
}
createServer()