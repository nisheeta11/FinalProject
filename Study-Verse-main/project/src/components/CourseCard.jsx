// import React, { useState } from 'react';
// import './CourseCard.css'; 

// const relatedCoursesData = {
//   'Web Development': [
//     { id: 1, title: 'React Basics', description: 'Learn React from scratch.' },
//     { id: 2, title: 'Node.js Fundamentals', description: 'Backend with Node.js.' },
//   ],
//   'Data Science': [
//     { id: 3, title: 'Python for Data Science', description: 'Intro to Python.' },
//     { id: 4, title: 'Machine Learning', description: 'Basics of ML.' },
//   ],
 
// };

// const CourseCard = ({ title, description }) => {
//   const [showRelated, setShowRelated] = useState(false);

//   const relatedCourses = relatedCoursesData[title] || [];

//   return (
//     <div className="course-card">
//       <h3>{title}</h3>
//       <p>{description}</p>
//       <button className="btn" onClick={() => setShowRelated(!showRelated)}>
//         {showRelated ? 'Hide Related Courses' : 'Show Related Courses'}
//       </button>

//       {showRelated && relatedCourses.length > 0 && (
//         <div className="related-courses">
//           <h4>Related Courses:</h4>
//           <div className="related-list">
//             {relatedCourses.map((course) => (
//               <div key={course.id} className="related-card">
//                 <h5>{course.title}</h5>
//                 <p>{course.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseCard;
