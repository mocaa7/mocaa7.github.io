import React from 'react'
import {Link} from "react-router-dom";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../CourseManager.css';

class CourseGridCardComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: props.course.title,
      course: props.course
    }
  };

  onSaveCourse() {
    const newCourse = {...this.props.course, title: this.state.title};
    this.props.saveCourse(newCourse, newCourse._id);
    this.setState({isEditing: false});
  }

  onChange(event) {
    this.setState({title: event.target.value});
  }

  onEdit() {
    this.setState({isEditing: true})
  }

  deleteCourse() {
    this.props.deleteCourse(this.state.course);
    this.setState({title: '', course: null})
  }

  onSelectCourse() {
    this.props.onCourseTitleSelect(this.state.course.title);
    this.props.showCourseEditor();
  }

  render() {
    return (
        <div
            className={"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 card-body wbdv-grid"}>

          {!this.state.isEditing &&
          <div>
            <Link to={`/course/${this.state.course._id}`}>
              <h5 className="card-title" onClick={() => this.onSelectCourse()}>
                {this.state.title}</h5>
            </Link>
            <div>
              <i className="fa-2x fa fa-pencil"
                 onClick={() => this.onEdit()}/>
              <i className="fa-2x fa fa-trash"
                 onClick={() => this.deleteCourse()}/>
            </div>
          </div>}

          {this.state.isEditing &&
          <div>
            <input type="text" className={"typing-container"}
                   value={this.state.title}
                   onChange={(e) => this.onChange(e)}/>
            <i className="fa fa-check fa-2x"
               onClick={() => this.onSaveCourse()}/>
          </div>}

        </div>
    )
  };
}

export default CourseGridCardComponent;