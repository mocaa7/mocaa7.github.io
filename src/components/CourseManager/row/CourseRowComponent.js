import React from "react";
import {Link} from "react-router-dom";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../CourseManager.css';

class CourseRowComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: props.course.title,
      course: props.course
    };
  }

  onSaveCourse() {
    const newCourse = {...this.state.course, title: this.state.title};
    this.props.saveCourse(newCourse, this.state.course._id);
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
    this.setState({title: '', course: null});
  };

  onSelectCourse() {
    this.props.onCourseTitleSelect(this.state.course.title);
    this.props.showCourseEditor();
  }

  render() {
    return (
        <li className={`list-group-item ${this.props.isSelected ? 'active'
            : ''}`}
            onClick={() => this.props.onHighlight(this.props.course._id)}>

          {!this.state.isEditing &&
          <div>
            <Link to={`/course/${this.state.course._id}`}>
              {this.props.isSelected &&
              <text className={"wbdv-selected"}
                    onClick={() => this.onSelectCourse()}>
                {this.state.title}
              </text>
              }
              {!this.props.isSelected &&
              <text onClick={() => this.onSelectCourse()}>
                {this.state.title}
              </text>
              }
            </Link>
            <span className={"wbdv-icon float-right"}>
                <i className="fa-2x fa fa-pencil"
                   onClick={() => this.onEdit()}/>
                <i className="fa-2x fa fa-trash"
                   onClick={() => this.deleteCourse()}/>
              </span>
          </div>}

          {this.state.isEditing &&
            <div>
              <input type="text" className={"typing-container"}
                     value={this.state.title}
                     onChange={(e) => this.onChange(e)}/>
              <i className="fa fa-check fa-2x"
                 onClick={() => this.onSaveCourse()}/>
            </div>}

        </li>
    )
  }
}

export default CourseRowComponent;