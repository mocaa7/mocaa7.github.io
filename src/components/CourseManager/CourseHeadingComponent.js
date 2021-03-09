import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './CourseManager.css';

const CourseHeadingComponent = () =>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white wbdv-margin-below wbdv-nav">
      <div className="pr-3">
         <span className="navbar-toggler-icon wbdv-field wbdv-hamburger"/>
      </div>
      <text className="pr-2 wbdv-nav-title wbdv-label wbdv-course-manager">
        Course Manager</text>
    </nav>;

export default CourseHeadingComponent