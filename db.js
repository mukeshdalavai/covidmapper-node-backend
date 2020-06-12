const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/data',{useNewUrlParser : true, useUnifiedTopology : true})
        .then((res) => {
            console.log("Connected to MongoDB instance....")
        }).catch((err) => {
            console.log("Error in connecting to MongoDB ->" + err);
        })


const CountrySchema = mongoose.Schema({
    name : String,
    confirmed : Number,
    recovered : Number,
    active : Number,
    deaths : Number
});

const country = mongoose.model('country', CountrySchema);

exports.country = country;