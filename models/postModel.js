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
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Posts', postSchema);