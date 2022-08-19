const mongoose = require('mongoose')

const { Schema } = mongoose
const { model } = mongoose
 

const movieSchema = new Schema ({}, { collection: "movies" })
const moviesModel = model("sample_mflix", movieSchema, "movies")

module.exports = moviesModel