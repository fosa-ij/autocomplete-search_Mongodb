const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId} = require('mongodb')
require('dotenv').config()
const PORT = 8000

let db, 
    dbName = 'sample_mflix',
    dbConnectionStr = process.env.DB_STRING,
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

    app.get('/search', async (req, res) => {
        try{
            let result = await collection.aggregate([
                {
                    "$search" : {
                        "autocomplete" : {
                            "query" : `${req.query.query}`,
                            "path": "title", 
                            "fuzzy": {
                                "maxEdits": 2,
                                "prefixLength": 3
                            }
                        }
                    }
                }
            ]).toArray()
            res.send(result)

        } catch(err){
            // console.error(err);
            res.status(500).send({message: error.message})
        }
    })

    app.get('/get/:id', async (req, res) => {
        try{
            let result = await collection.findOne({
                "_id": ObjectId(req.params.id)
            })
            response.send(result)
        } catch(err){
            res.status(500).send({message: error.message})
        }
    })

    app.listen(process.env.PORT || PORT, () => {
        console.log('Server is running...');
    })
}
createServer()