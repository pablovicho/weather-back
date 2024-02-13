import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema({
    id: Number,
    date: Date,
    likes: Number,
});

module.exports = mongoose.model('Likes', LikesSchema);