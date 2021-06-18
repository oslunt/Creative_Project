const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const users = require('./users.js');
const User = users.model;
const validUser = users.valid;

const articles = require('./articles.js');
const Article = articles.model;

const commentSchema = new mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    article: {
        type: mongoose.Schema.ObjectId,
        ref: 'Article'
    },
    created: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', commentSchema);

router.post("/:id", validUser, async (req, res) => {
    let article = await Article.findOne({
        _id: req.params.id
    }).populate("user");
    let comment = new Comment({
        comment: req.body.comment,
        user: req.user,
        article: article,
    });
    try {
        await comment.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/all/:id", async (req, res) => {
    let article = await Article.findOne({
        _id: req.params.id
    }).populate("user");
    try {
        let comments = await Comment.find({
            article: article
        }).sort({
            created: -1
        }).populate('user');
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router, 
    model: Comment,
}