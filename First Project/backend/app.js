const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const routeBooks = require('./routes/book_routes');

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/', (req, res)=> {
    res.send("Welcome!");
})

app.use("/api/books", routeBooks);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true}, () => console.log("Database connected!"
));

const PORT = process.env.PORT |8000 ;

app.listen(PORT,console.log(`Server up and running at port ${PORT}`));