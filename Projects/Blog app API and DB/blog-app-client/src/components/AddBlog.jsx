import axios from "axios";
import React, { useState } from "react";
import './AddBlog.css'; // Import the CSS file

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3001/api/blog/", formData)
      .then((response) => {
        console.log(response);
        // Reset form after successful submission
        setFormData({
          title: "",
          author: "",
          description: "",
        });
        // Optionally, you could add a success message or redirect
      })
      .catch((err) => {
        console.log(err);
        // Optionally, handle error (show error message, etc.)
      });
  };

  return (
    <div className="add-blog-container">
      <form onSubmit={handleSubmit} className="add-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter Title"
            className="add-blog-input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            name="author"
            placeholder="Enter Author"
            className="add-blog-input"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Enter Description"
            className="add-blog-input"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="add-blog-button">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;