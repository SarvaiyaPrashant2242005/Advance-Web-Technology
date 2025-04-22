import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [editId, setEditId] = useState(null);

    const fetchBlogs = async () => {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`http://localhost:5000/api/blogs/${editId}`, formData);
            setEditId(null);
        } else {
            await axios.post('http://localhost:5000/api/blogs', formData);
        }
        setFormData({ title: '', content: '' });
        fetchBlogs();
    };

    const handleEdit = (blog) => {
        setEditId(blog._id);
        setFormData({ title: blog.title, content: blog.content });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        fetchBlogs();
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Blog Manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                /><br />
                <textarea
                    placeholder="Content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                /><br />
                <button type="submit">{editId ? 'Update' : 'Add'} Blog</button>
            </form>

            <ul>
                {blogs.map((blog) => (
                    <li key={blog._id}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <button onClick={() => handleEdit(blog)}>Edit</button>
                        <button onClick={() => handleDelete(blog._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
