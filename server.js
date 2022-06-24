const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static(__dirname + '/public'))


const connectionString = 'mongodb+srv://ikhuong:lol19022002@clustermangel.nn7l7.mongodb.net/iMangel?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('iMangel')
        const ToysCollection = db.collection('toys')
        // Make sure you place body-parser before your CRUD handlers!
        app.use(bodyParser.urlencoded({ extended: true }))
        app.set('view engine', 'ejs')
        app.use(bodyParser.json())

        app.get('/create', (req, res) => {
            db.collection('categories').find().toArray()
                .then(results => {
                    res.render(__dirname + '/views/create.ejs', { categories: results })
                })
                .catch(error => console.error(error))
        })

        app.get('/', (req, res) => {
            db.collection('toys').find().toArray()
                .then(results => {
                    res.render(__dirname + '/views/index.ejs', { toys: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/toys', (req, res) => {
            ToysCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.delete('/toys', (req, res) => {
            console.log('Deleted ' + req.body.name)
            ToysCollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    res.json(`Deleted Toy`)
                })

                .catch(error => console.error(error))
        })

        app.listen(process.env.PORT || 3000, function () {
            console.log('listening on 3000')
        })

    })
    .catch(error => console.error(error))