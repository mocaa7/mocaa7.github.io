import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../components/CourseManager/CourseManager.css';
import CourseRowComponent from "../components/CourseManager/row/CourseRowComponent";

class CourseTableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightedCourseId: null
    }
  }

  onHighlight(courseId) {
    this.setState({highlightedCourseId: courseId});
  }

  render() {
    return (
        <div className="container-fluid">
          <h3>Course Table {this.props.courses.length}</h3>
          <ul className="list-group">
            {this.props.courses && this.props.courses.map(course =>
                <CourseRowComponent
                    key={course._id}
                    saveCourse={this.props.saveCourse}
                    isSelected={course._id === this.state.highlightedCourseId}
                    onHighlight={this.onHighlight.bind(this)}
                    onCourseTitleSelect={this.props.onCourseTitleSelect}
                    showCourseEditor={this.props.showCourseEditor}
                    deleteCourse={this.props.deleteCourse}
                    course={course}/>
            )
            }
          </ul>
        </div>
    )
  };
}

export default CourseTableContainer
