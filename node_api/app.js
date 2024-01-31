const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { connectToDb, getDb } = require('./src/db/mongodb')
const { ObjectId } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

/*MIDDLEWARE===============================================================================================================================================================================================*/
app.use(bodyParser.json())

/*MONGODB===============================================================================================================================================================================================*/
let db
connectToDb((err) =>{
    if(!err){
        db = getDb()
    }
})

/*ROUTES===================================================================================================================================================================================================*/
// require('./src/routes/books')(app)

app.get('/books', (req, res) => { 
    const page = req.query.page || 0        
    const elementPerPage = 1   
    const skipCount = page * elementPerPage
    let books = []       

    db.collection('books')
    .find()
    .sort({author: 1})
    .skip(skipCount)
    .limit(elementPerPage)
    .forEach(book => books.push(book))
    .then(() => {
     res.status(200).json(books)
    })
    .catch(() => {
     res.status(500).json({error: 'Could not fetch the documents'})
    })

 })

 app.get('/books/:id', (req, res) => {            
    if(ObjectId.isValid(req.params.id))   {
        db.collection('books')
            .findOne({_id: new ObjectId(req.params.id)})
            .then(doc => {
            res.status(200).json(doc)
            })
            .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})
            })
    }else{
        res.status(500).json({error: 'Not a valid doc id'})
    }
 })

 app.post('/books', (req, res) => {            
   const book = req.body

   db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new document'})
    })
 })

 app.delete('/books/:id', (req, res) => {            
    if(ObjectId.isValid(req.params.id))   {
        db.collection('books')
            .deleteOne({_id: new ObjectId(req.params.id)})
            .then(result => {
            res.status(200).json(result)
            })
            .catch(() => {
            res.status(500).json({error: 'Could not delete the documents'})
            })
    }else{
        res.status(500).json({error: 'Not a valid doc id'})
    }
 })

 app.patch('/books/:id', (req, res) => {            
    const updates = req.body

    if(ObjectId.isValid(req.params.id))   {
        db.collection('books')
            .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(() => {
                res.status(500).json({error: 'Could not update the document'})
            })
    }else{
        res.status(500).json({error: 'Not a valid doc id'})
    }
 })

/*GESTION_DES_ERREURS===============================================================================================================================================================================================*/
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandee : vous pouvez essayez une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est demarre sur : http://localhost:${port}`));



