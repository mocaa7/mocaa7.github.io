import React from 'react'
// import {Link} from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './CourseManager.css';

const CourseSearchAndToggleComponent = ({updateFormState, addCourse, toggle}) =>
    <div id="wbdv-search" className="form-inline my-1 my-lg-0">
      <div>
        <input
            id="wbdv-search-bar"
            className="form-control mr-lg-2 wbdv-placeholder wbdv-field wbdv-new-course"
            onChange={(e) => updateFormState(e)}
            placeholder="New Course"
            aria-label="Search"/>
        <i onClick={() => addCourse()}
           className="fa fa-plus-circle fa-3x wbdv-add"/>
      </div>
      <i onClick={() => toggle()}
         className="fa fa-th fa-lg fa-3x wbdv-button wbdv-grid-layout"/>
    </div>;

export default CourseSearchAndToggleComponent;
