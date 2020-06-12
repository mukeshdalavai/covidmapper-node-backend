const router = require('express').Router();
const db = require('./db');

router.get('/data', (req, res) => {
    console.log("Fetching data from database.....");
    db.country.find().then((docs) => {
        res.status(200).send(docs);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

router.get('/country', (req, res) => {
    console.log(`Fetching Data for -> ${req.query.name}`);
    db.country.findOne({name : req.query.name})
        .then((doc) => {
            if(!doc){
                res.status(404).send("Country Data is not present in DB...");
            }else{
                res.status(200).send(doc);
            }
        }).catch((err) => {
            res.status(400).send(err);
        })
})


router.post('/save', (req, res) => {
    console.log(req.body);
    const data = new db.country({
        name : req.body.name,
        confirmed : req.body.confirmed,
        active : req.body.active,
        recovered : req.body.recovered,
        deaths : req.body.deaths
    })
    data.save().then((doc) => {
        res.status(202).send(doc);
    }).catch((err) => res.status(400).send(err));
    
})

router.delete('/remove/:name', (req, res) => {
    console.log(`Removing Data for -> ${req.params.name}`);
    db.country.remove({name : req.params.name}).then((data) => {
        if(data.deletedCount == 0){
            res.status(404).send(`${req.params.name} data doesn't exist in DB....`);
        }else{
            res.status(200).send(data);
        }
    }).catch((err) => {
        res.status(400).send(err);
    })
})

exports.router = router;

