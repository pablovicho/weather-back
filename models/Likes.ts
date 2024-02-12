import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema({
    date: Date,
    likes: Number,
});

module.exports = mongoose.model('Likes', LikesSchema);