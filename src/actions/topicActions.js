export const CREATE_TOPIC = 'CREATE_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';
export const FIND_ALL_TOPICS_FOR_LESSON = 'FIND_ALL_TOPICS_FOR_LESSON';
export const UPDATE_TOPIC = 'UPDATE_TOPIC';

export const createTopic = (topic) => ({
  type: CREATE_TOPIC,
  newTopic: topic
});

export const deleteTopic = (topicId) => ({
  type: DELETE_TOPIC,
  topicId: topicId
});

export const findAllTopicsForLesson = (topics) => ({
  type: FIND_ALL_TOPICS_FOR_LESSON,
  topics: topics
});

export const updateTopic = (topic) => ({
  type: UPDATE_TOPIC,
  topic: topic
});

export default {CREATE_TOPIC, DELETE_TOPIC, FIND_ALL_TOPICS_FOR_LESSON, UPDATE_TOPIC,
  deleteTopic, createTopic, findAllTopicsForLesson, updateTopic}