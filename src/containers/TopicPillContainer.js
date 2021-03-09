import React from "react";
import {connect} from "react-redux";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../components/CourseEditor/CourseEditor.css';
import '../components/CourseManager/CourseManager.css';
import {createTopic, deleteTopic, findAllTopicsForLesson, updateTopic} from '../actions/topicActions'
import TopicService from '../services/TopicService'
import TopicPillItemComponent from "../components/CourseEditor/TopicPillItemComponent";

const service = new TopicService();

class TopicPillContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTopicId: props.curTopicId,
      topics: [],
    };
  }

  componentDidMount() {
    this.updateTopics();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lessonId !== this.props.lessonId) {
      this.updateTopics();
    }
  }

  async updateTopics() {
    const topics = await service.findTopicsForLesson(this.props.lessonId);
    this.setState({topics: topics});
  }

  async addTopic() {
    await this.props.createTopic(this.props.lessonId);
    this.updateTopics();
  }

  onSelect(topicId) {
    this.setState({selectedTopicId: topicId});
    this.props.history.push(
        `/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topicId}`
    );
  }

  async onDelete(topicId) {
    this.setState({selectedTopicId: topicId});
    await this.props.deleteTopic(topicId);
    await this.updateTopics();
  }

  async onSave(topicId, newTopic) {
    await this.props.updateTopic(topicId, newTopic);
    await this.updateTopics();
  }

  render() {
    return (
        <ul className="nav nav-pills wbdv-margin-below wbdv-category">
          {this.state.topics && this.state.topics.map(topic =>
              <TopicPillItemComponent
                  key={topic.id}
                  isSelected={topic.id === this.state.selectedTopicId}
                  topic={topic}
                  onSelect={this.onSelect.bind(this, topic.id)}
                  onDelete={this.onDelete.bind(this, topic.id)}
                  onSave={this.onSave.bind(this, topic.id)}/>
          )}
          <li className="nav-item" onClick={() => this.addTopic()}>
            <i className="nav-link fa fa-plus-circle fa-2x"/>
          </li>
        </ul>
    );
  }
}
// Receives the entire store state and returns an
// object of data this component needs
const stateToPropertyMapper = (state) => {
  return {
    topics: state.topics.topics
  }
};

// fetches data from the server
const dispatchToPropertyMapper = (dispatch) => {
  return {
    createTopic: (lessonId) =>
        service.createTopic(lessonId)
        .then(actualTopic => dispatch(createTopic(actualTopic))),

    findAllTopicsForLesson: (lessonId) =>
        service.findTopicsForLesson(lessonId)
        .then(actualTopics =>
            dispatch(findAllTopicsForLesson(actualTopics))),

    updateTopic: (topicId, topic) =>
        service.updateTopic(topicId, topic)
        .then(updatedTopic =>
            dispatch(updateTopic(updatedTopic))),

    deleteTopic: (topicId) =>
        service.deleteTopic(topicId)
        .then(status =>
            dispatch(deleteTopic(topicId)))
  }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(TopicPillContainer)

