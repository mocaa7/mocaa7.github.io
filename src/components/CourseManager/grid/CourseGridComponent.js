import React from 'react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../CourseManager.css';

import CourseGridCardComponent from './CourseGridCardComponent'

const CourseGridComponent = ({
  courses, saveCourse, onCourseTitleSelect,
  showCourseEditor, deleteCourse
}) =>
    <div className="container-fluid">
      <h3>Course Grid {courses.length}</h3>
      <div className="row row-cols-3 card-deck">
        {courses && courses.map(course =>
            <CourseGridCardComponent
                key={course._id}
                saveCourse={saveCourse}
                onCourseTitleSelect={onCourseTitleSelect}
                showCourseEditor={showCourseEditor}
                deleteCourse={deleteCourse}
                course={course}
            />
        )
        }
      </div>
    </div>;

export default CourseGridComponent;