import React from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './CourseEditor.css'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

import moduleReducer from '../../reducers/moduleReducer.js'
import lessonReducer from '../../reducers/lessonReducer.js'
import topicReducer from '../../reducers/topicReducer.js'
import widgetReducer from '../../reducers/widgetReducer.js'

import ModuleListContainer from '../../containers/ModuleListContainer';
import LessonTabContainer from "../../containers/LessonTabContainer";
import TopicPillContainer from "../../containers/TopicPillContainer";
import WidgetListContainer from "../../containers/WidgetListContainer";

const rootReducer = combineReducers({
  modules: moduleReducer,
  lessons: lessonReducer,
  topics: topicReducer,
  widgets: widgetReducer
});

export const store = createStore(rootReducer);

class CourseEditorComponentStateful extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      selectedCourseId: props.courseId,
      curPath: props.history.location.pathname
    }
  }

  closeEditor() {
    this.props.hideCourseEditor();
    this.props.history.push("/");
  }

  render() {
    return (
        <Provider store={store}>
          <div className="container-fluid">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white wbdv-margin-below wbdv-nav">
              <button className="btn btn-sm pr-4 wbdv-white-icon wbdv-course-editor wbdv-close"
                onClick={() => this.closeEditor()}>
                <i className="fa fa-times pt-1 fa-1.6x"/></button>
              <h2>Course Editor {this.props.courseTitle}</h2>
            </nav>

            <div className="row">
              
              <div className="col-4">
                <h4>Module List</h4>
                <ModuleListContainer
                    curModuleId={this.props.moduleId}
                    courseId={this.props.courseId}
                    history={this.props.history}/>
              </div>

              {this.props.match.params.moduleId &&
              <div className="col-8 container fluid wbdv-module-info">
                <h5>Lesson Tabs</h5>
                <LessonTabContainer
                    curLessonId={this.props.lessonId}
                    moduleId={this.props.moduleId}
                    courseId={this.props.courseId}
                    history={this.props.history}/>

                {this.props.match.params.lessonId &&
                <div className="col container fluid">
                  <h5>Topic List</h5>
                  <TopicPillContainer
                      curTopicId={this.props.topicId}
                      lessonId={this.props.lessonId}
                      moduleId={this.props.moduleId}
                      courseId={this.props.courseId}
                      history={this.props.history}/>

                  {this.props.match.params.topicId &&
                  <span>
                    <WidgetListContainer
                        topicId={this.props.topicId}
                        lessonId={this.props.lessonId}
                        moduleId={this.props.moduleId}
                        courseId={this.props.courseId}
                        history={this.props.history}/>
                  </span>
                  }
                </div>
                }
              </div>
              }
            </div>
          </div>
        </Provider>);
  }
}

export default CourseEditorComponentStateful;