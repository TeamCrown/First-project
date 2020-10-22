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
        await Book.findByIdAndDelete(id);
        res.status(200).json({message: "Book Deleted successfully!"});
    } catch (e) {
        res.status(500).json({message:e});
    }
} );

router.put("/:bookId", (req, res)=>{
   
        const id = req.params.bookId;
        
            Book.findByIdAndUpdate(id,req.body,{
                author: req.body.author,
                genre: req.body.genre,
                description: req.body.description,
                coverImage: req.body.coverImage,
                language: req.body.language,
                review: req.body.review,
            }, (err,doc)=>{
                if(err){
                    res.status(500).json({message:"Error updating the book"});
                }else{
                    res.status(200).json({message:"book updated"});
                }
            });
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