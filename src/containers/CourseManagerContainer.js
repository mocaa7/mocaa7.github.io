import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../components/CourseManager/CourseManager.css'
import CourseService from "../services/CourseService";
import CourseEditorComponentStateful
  from '../components/CourseEditor/CourseEditorComponentStateful';
import CourseListComponent
  from '../components/CourseManager/CourseListComponent.js';

const service = new CourseService();

class CourseManagerContainer extends React.Component {

  state = {
    layout: 'table',
    editingCourse: false,
    selectedCourseTitle: null,
    newCourseTitle: 'New Course',
    courses: []
  };

  componentDidMount() {
    this.updateCourses()
  };

  async updateCourses() {
    const courses = await service.findAllCourses();
    this.setState({ courses: courses });
  }

  async addCourse() {
    await service.createCourse({ title: this.state.newCourseTitle });
    this.updateCourses();
  }

  async saveCourse(courseId, course) {
    await service.updateCourse(courseId, course);
    await this.updateCourses();
  }

  onCourseTitleSelect(title) {
    this.setState({ selectedCourseTitle: title });
  }

  async deleteCourse(deletedCourse) {
    await service.deleteCourse(deletedCourse._id);
    const courses = await service.findAllCourses();
    this.setState({ courses: courses })
  };

  toggle() {
    this.setState(prevState => ({
      layout: prevState.layout === 'grid' ? 'table' : 'grid'
    }))
  };

  updateFormState(event) {
    this.setState({ newCourseTitle: event.target.value });
  };

  showCourseEditor() {
    this.setState({ editingCourse: true });
  }

  hideCourseEditor() {
    this.setState({ editingCourse: false });
  }

  render() {
    return (
      <div className="container-fluid">
        <Router>
          <Route
            path="/course/:courseId"
            exact={true}
            render={(props) =>
              <CourseEditorComponentStateful
                {...props}
                courseTitle={this.state.selectedCourseTitle}
                courseId={props.match.params.courseId}
                hideCourseEditor={this.hideCourseEditor.bind(this)} />
            } />
          <Route
            path="/course/:courseId/module/:moduleId"
            exact={true}
            render={(props) =>
              <CourseEditorComponentStateful
                {...props}
                courseTitle={this.state.selectedCourseTitle}
                moduleId={props.match.params.moduleId}
                courseId={props.match.params.courseId}
                hideCourseEditor={this.hideCourseEditor.bind(this)} />
            } />
          <Route
            path="/course/:courseId/module/:moduleId/lesson/:lessonId"
            exact={true}
            render={(props) =>
              <CourseEditorComponentStateful
                {...props}
                courseTitle={this.state.selectedCourseTitle}
                lessonId={props.match.params.lessonId}
                moduleId={props.match.params.moduleId}
                courseId={props.match.params.courseId}
                hideCourseEditor={this.hideCourseEditor.bind(this)} />
            } />
          <Route
            path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"
            exact={true}
            render={(props) =>
              <CourseEditorComponentStateful
                {...props}
                courseTitle={this.state.selectedCourseTitle}
                topicId={props.match.params.topicId}
                lessonId={props.match.params.lessonId}
                moduleId={props.match.params.moduleId}
                courseId={props.match.params.courseId}
                hideCourseEditor={this.hideCourseEditor.bind(this)} />
            } />
          <Route
            path="/"
            exact={true}
            render={() =>
              <CourseListComponent
                layout={this.state.layout}
                saveCourse={this.saveCourse.bind(this)}
                onCourseTitleSelect={this.onCourseTitleSelect.bind(this)}
                updateFormState={this.updateFormState.bind(this)}
                addCourse={this.addCourse.bind(this)}
                toggle={this.toggle.bind(this)}
                courses={this.state.courses}
                showCourseEditor={this.showCourseEditor.bind(this)}
                deleteCourse={this.deleteCourse.bind(this)} />
            } />
        </Router>
      </div>
    );
  }
}

export default CourseManagerContainer
