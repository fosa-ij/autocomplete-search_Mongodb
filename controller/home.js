const moviesModel = require('../model/model')

module.exports = {
    getHomePage: (req, res) => {
        res.render("index.ejs")
    },
    getMovies: async (request, response) => {
        try{
            let result = await moviesModel.aggregate([
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
            ])
            response.send(result)

        } catch(error){
            console.error(error);
            response.status(500).send({message: error.message})
        }
    },
    getMoviePage: async (request, response) => {
        try{
            let result = await moviesModel.findOne({
                '_id': request.params.id
            })
            response.send(result)
        } catch(error){
            response.status(500).send({message: error.message})
        }
    }
}