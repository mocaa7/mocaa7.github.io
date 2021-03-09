import {CREATE_TOPIC, DELETE_TOPIC, UPDATE_TOPIC, FIND_ALL_TOPICS_FOR_LESSON}
  from "../actions/topicActions";

const topicReducer = (state = {topics: []}, action) => {
  switch(action.type) {
    case FIND_ALL_TOPICS_FOR_LESSON:
      return {topics: action.topics};
    case CREATE_TOPIC:
      return {topics: [...state.topics, action.newTopic]};
    case DELETE_TOPIC:
      return {topics: state.topics.filter(topic => topic.id !== action.topicId)};
    case UPDATE_TOPIC:
      return {topics: state.topics.map(topic =>
        topic.id === action.topic.id ? action.topic : topic)};
    default:
      return state
  }
};

export default topicReducer