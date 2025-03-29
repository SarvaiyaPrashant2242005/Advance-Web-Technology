import axios from "axios";
import React, { useEffect, useState } from "react";
import './ListBlog.css'; // Import the CSS file

const ListBlog = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "test", author: "unknown", description: "pata nahi" },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:3001/api/blog/")
      .then((response) => {
        console.log(response.data.blogs);
        setBlogs(response.data.blogs)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="blog-table-container">
      <table className="blog-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.description}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBlog;