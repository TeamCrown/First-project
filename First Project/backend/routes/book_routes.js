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

router.get("/:bookId", async (req, res)=>{
    try{
        const id = req.params.bookId;
        const book = await Book.findById(id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: "No Valid entry found"});
        }
    } catch (e) {
        res.status(500).json({message:e});
    }
});

router.delete("/:bookId",async (req, res)=>{
    try{
        const id = req.params.bookId;
        await Book.delete(id);
        Book.updateOne()
        res.status(200).json({message: "Book Deleted successfully!"});
    } catch (e) {
        res.status(500).json({message:e});
    }
} );

router.update("/:bookId", async (req, res)=>{
    try{
        const id = req.params.bookId;
        const book = Book.findById(id);
        const updated = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            coverImage: req.body.coverImage,
            language: req.body.language,
            review: req.body.review,
        });
        if (book){
            await Book.updateOne({_id:id,$set: updated});
            res.status(200).json()
        } else {
            res.status(404).json({message: "No Valid entry found"});
        }
    } catch (e) {
        res.status(500).json({message:e});
    }
})

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