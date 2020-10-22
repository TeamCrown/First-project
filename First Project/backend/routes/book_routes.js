const router = require('express').Router();
const Book = require('../models/book');


router.get("/", async(req, res)=>{
    try{
        const books = await Book.find();
        res.status(200).json(books);
    } catch (e) {
        res.status(500).json({message: e});
    }
});

router.post("/", async (req, res)=>{
    const myBook = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        coverImage: req.body.coverImage,
        language: req.body.language,
        review: req.body.review,
    });
    try {
        const savedBook = await myBook.save();
        res.status(201).json({
            message: "Book created successfully",
            createdBook: savedBook
        });
    } catch (e){
        res.status(500).json({message:e});
    }
});

module.exports = router;