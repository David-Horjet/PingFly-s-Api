const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const postSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    likes_count: {
        type: Number,
    },
    author: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Posts', postSchema);