const { connectToDb, getDb } = require("../db/mongodb")

module.exports = (app) => {
    app.get('/books', (req, res) => {            
       let books = []       

       db.collection('books')
       .find()
       .sort({author: 1})
       .forEach(book => books.push(book))
       .then(() => {
        res.status(200).json(books)
       })
       .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
       })

    })
}
