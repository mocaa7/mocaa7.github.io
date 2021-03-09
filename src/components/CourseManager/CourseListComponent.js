import React from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../CourseManager/CourseManager.css'
import CourseGridComponent from "./grid/CourseGridComponent";
import CourseTableContainer from "../../containers/CourseTableContainer";
import CourseHeadingComponent from "./CourseHeadingComponent";
import CourseSearchAndToggleComponent from "./CourseSearchAndToggleComponent";

const CourseListComponent = ({layout, saveCourse, onCourseTitleSelect, updateFormState,
  addCourse, toggle, courses, showCourseEditor, deleteCourse}) =>
  <div className="container-fluid">
    <CourseHeadingComponent/>
    <CourseSearchAndToggleComponent
        updateFormState={updateFormState}
        addCourse={addCourse}
        toggle={toggle}/>
    {layout === 'table' &&
    <CourseTableContainer
        courses={courses}
        saveCourse={saveCourse}
        onCourseTitleSelect={onCourseTitleSelect}
        showCourseEditor={showCourseEditor}
        deleteCourse={deleteCourse}/>}
    {layout === 'grid' &&
    <CourseGridComponent
        courses={courses}
        saveCourse={saveCourse}
        onCourseTitleSelect={onCourseTitleSelect}
        showCourseEditor={showCourseEditor}
        deleteCourse={deleteCourse}/>}
  </div>;

export default CourseListComponent;
