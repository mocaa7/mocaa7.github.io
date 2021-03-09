import React from 'react';
import {connect} from "react-redux";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../components/CourseEditor/CourseEditor.css';
import '../components/CourseManager/CourseManager.css';
import {createLesson, deleteLesson, findAllLessonsForModule, updateLesson} from '../actions/lessonActions'
import LessonService from '../services/LessonService';
import LessonTabItemComponent from '../components/CourseEditor/LessonTabItemComponent';

const service = new LessonService();

class LessonTabContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      selectedLessonId: props.curLessonId,
      lessons: []
    }
  }

  componentDidMount() {
    this.updateLessons();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.moduleId !== this.props.moduleId) {
      this.updateLessons();
    }
  }

  async updateLessons() {
    const lessons = await service.findLessonsForModule(this.props.moduleId);
    this.setState({lessons: lessons});
  }

  async addLesson() {
    await this.props.createLesson(this.props.moduleId);
    this.updateLessons();
  }

  onSelect(lessonId) {
    this.setState({selectedLessonId: lessonId});
    this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lessonId}`);
  }

  async onDelete(lessonId) {
    this.setState({selectedLessonId: lessonId});
    await this.props.deleteLesson(lessonId);
    await this.updateLessons();
  }

  async onSave(lessonId, newLesson) {
    await this.props.updateLesson(lessonId, newLesson);
    await this.updateLessons();
  }

  render() {
    return (
      <ul className="nav nav-tabs wbdv-margin-below wbdv-category">
        {this.state.lessons && this.state.lessons.map(lesson =>
          <LessonTabItemComponent
            key={lesson._id}
            isSelected={lesson._id === this.state.selectedLessonId}
            lesson={lesson}
            onSelect={this.onSelect.bind(this, lesson._id)}
            onDelete={this.onDelete.bind(this, lesson._id)}
            onSave={this.onSave.bind(this, lesson._id)}/>
        )}
        <li className="nav-item" onClick={() => this.addLesson()}>
            <i className="nav-link fa fa-plus-circle fa-2x"/>
        </li>
      </ul>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {lessons: state.lessons.lessons}
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    createLesson: (moduleId) =>
      service.createLesson(moduleId, {title: 'New lesson'})
      .then(actualLesson =>
          dispatch(createLesson(actualLesson, moduleId))),

    findAllLessonsForModule: (moduleId) =>
      service.findLessonsForModule(moduleId)
      .then(actualLesson =>
          dispatch(findAllLessonsForModule(actualLesson))),

    updateLesson: (lessonId, lesson) =>
      service.updateLesson(lessonId, lesson)
      .then(updatedLesson =>
          dispatch(updateLesson(updatedLesson))),

    deleteLesson: (lessonId) =>
      service.deleteLesson(lessonId)
      .then(status =>
          dispatch(deleteLesson(lessonId)))
  }
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(LessonTabContainer)