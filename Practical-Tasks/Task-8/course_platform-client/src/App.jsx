// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

// Course Search and Enrollment App
const App = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [username, setUsername] = useState('');
  
  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/courses', {
        params: { search: searchTerm }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Enroll in a course
  const enrollInCourse = async (courseId) => {
    if (!username) {
      alert('Please enter your username first');
      return;
    }

    try {
      await axios.post('http://localhost:5000/enroll', {
        username,
        courseId
      });
      alert('Successfully enrolled!');
      fetchEnrolledCourses(); // Refresh the enrolled courses list
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  // Fetch enrolled courses by username
  const fetchEnrolledCourses = async () => {
    if (!username) {
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:5000/enrolled/${username}`);
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchTerm]); // Re-fetch courses when the search term changes

  return (
    <div className="App">
      <h1>Course Enrollment App</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="course-list">
        <h2>All Courses</h2>
        <div className="courses">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="course">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button onClick={() => enrollInCourse(course.id)}>Enroll</button>
              </div>
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      </div>

      <div className="enrollment">
        <h2>Enroll in a Course</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchEnrolledCourses}>View Enrolled Courses</button>

        <h2>Your Enrolled Courses</h2>
        <div className="enrolled-courses">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((enrollment) => (
              <div key={enrollment.id}>
                <h3>{enrollment.Course.title}</h3>
                <p>Instructor: {enrollment.Course.instructor}</p>
              </div>
            ))
          ) : (
            <p>No courses enrolled yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
