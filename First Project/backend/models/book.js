const mongoose = require('mongoose'),
    { Schema } = mongoose;

bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "can't be empty"],
        trim: true,
        unique: true
    },
    author: {
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        }
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    genre: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlenght:[150,"description exceeded maximum limit "]
    },
    coverImage: {
        type: Buffer,
        validate:{
            validator:function(fileName){
                 var exp = /^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/;         
                    return exp.test(fileName);  
               
            },
            message:props=>`${props.value} is not a valid image file  ` 
        }
    },
    language: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true,
        minlength:[150,"book's review is not enough"]
        
    },

}, { timestamps: true });
module.exports = mongoose.model("Book", bookSchema);