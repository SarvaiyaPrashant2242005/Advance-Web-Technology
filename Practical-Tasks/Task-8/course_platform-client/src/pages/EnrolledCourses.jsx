// src/pages/EnrolledCourses.js

import React from 'react';
import CourseCard from '../components/CourseCard';

const EnrolledCourses = ({ enrolled }) => {
  return (
    <div className="enrolled-page">
      <h2>Enrolled Courses</h2>
      <div className="course-list">
        {enrolled.length > 0 ? (
          enrolled.map(course => (
            <CourseCard key={course.id} course={course} onEnroll={() => {}} />
          ))
        ) : (
          <p>You have not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
