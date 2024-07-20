const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

app.post('/submit-blog', (req, res) => {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    newBlog.save((err) => {
        if (err) {
            res.status(500).send('Error saving blog post.');
        } else {
            res.status(200).send('Blog post saved successfully.');
        }
    });
});

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            res.status(500).send('Error fetching blog posts.');
        } else {
            res.json(blogs);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
