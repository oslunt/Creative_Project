const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});

const users = require('./users.js');
const User = users.model;
const validUser = users.valid;

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    article: String,
    title: String,
    description: String,
    path: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Article = mongoose.model('Article', articleSchema);

router.get('/all', async (req, res) => {
    try {
        let articles = await Article.find().sort({
            created: -1
        });
        return res.send(articles);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.post('/', validUser, upload.single('photo'), async (req, res) => {
    if (req.user.role !== "admin") {
        return res.sendStatus(403);
    }
    const article = new Article({
        user: req.user,
        article: req.body.article,
        title: req.body.title,
        description: req.body.description,
        path: "/images/" + req.file.filename,
    });
    try {
        await article.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.put('/:id', validUser, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.sendStatus(403);
    }
    try {
        let article = await Article.findOne({
            _id: req.params.id
        });
        if (!article) {
            res.send(404);
            return;
        }
        article.article = req.body.article;
        article.title = req.body.title;
        article.description = req.body.description;
        await article.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/one/:id", async (req, res) => {
    try {
        let article = await Article.findOne({
            _id: req.params.id
        });
        if (!article) {
            res.send(404);
            return;
        }
        return res.send(article);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/:id", validUser, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.sendStatus(403);
    }
    try {
        await Article.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Article,
}