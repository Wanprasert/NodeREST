
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// ! Database connection
mongoose.connect(
    'mongodb://admin:HKIcax73826@node42080-punnawat.proen.app.ruk-com.cloud:11525' ,

    {
        useNewUrlParser : true ,
        useUnifiedTopology : true ,
    }

);

const Book = mongoose.model('book' , {

    id : Number ,
    title : String ,
    author : String
});

const app = express();
app.use(bodyParser.json());

// * Create
app.post('/books' , async (req , res) => {

    try {

        const book = new Book(req.body);
        book.id = (await Book.countDocument()) + 1;
        await book.save();
        res.send(book);
    } catch (error) {

        res.status(600).send(error);
    }

});

// * Read all
app.get('/books' , async (req , res) => {

    try {

        const books = await Book.find();
        res.send(books);
    } catch (error) {

        res.status(500).send(error);
    }

});

// * Read one
app.get('/books/:id' , async (req , res) => {

    try {

        const book = await Book.findOne(req.params.id);
        res.end(book);
    } catch (error) {

        res.status(500).send(error);
    }

});

//  * Update
app.put('/books/:id' , async (req , res) => {

    try {

        const book = await Book.findOneAndUpdate(req.params.id , req.body , {
            new : true
        });
        res.send(book);
    } catch (error) {

        res.status(500).send(error);
    }

});

// * Delete
app.delete('/books/:id' , async (req , res) => {

    try {

        const book = await Book.findOneAndDelete(req.params.id);
        res.send(book);
    } catch (error) {

        res.status(500).send(error);
    }

});

// ! Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {

    console.log(`Server started at http://localhost:${PORT}`);
});