const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Create a new blog post
router.post('/', async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error) {
        next(error);
    }
});

// Get all blog posts
router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        next(error);
    }
});

// Get a single blog post
router.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

// Update a blog post
router.put('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

// Delete a blog post
router.delete('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
