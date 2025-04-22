import React from 'react';
import '../components/CouseCard.css';

const CourseCard = ({ course, onEnroll }) => {
  return (
    <div className="course-card">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <button onClick={() => onEnroll(course)}>Enroll</button>
    </div>
  );
};

export default CourseCard;
