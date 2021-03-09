const oldUrl = 'https://wbdv-generic-server.herokuapp.com/api/001367674';
const localUrl = 'http://localhost:8080/api';
const herokuUrl = 'https://serene-island-60523.herokuapp.com/api';

const getBaseUrl = () => herokuUrl;

class TopicService {
  async createTopic(lessonId) {
    const response = await fetch(`${getBaseUrl()}/lessons/${lessonId}/topics`, {
      method: 'POST',
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  }

  async findTopicsForLesson(lessonId) {
    const response = await fetch(`${getBaseUrl()}/lessons/${lessonId}/topics`);
    return await response.json();
  }

  async findAllTopics() {
    const response = await fetch(`${getBaseUrl()}/topics`);
    return await response.json();
  }

  async findTopicById(topicId) {
    const response = await fetch(`${getBaseUrl()}/topics/${topicId}`);
    return await response.json();
  }

  async updateTopic(topicId, topic) {
    const response = await fetch(`${getBaseUrl()}/topics/${topicId}`, {
      method: 'PUT',
      body: JSON.stringify(topic),
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  }

  async deleteTopic(topicId) {
    const response = await fetch(`${getBaseUrl()}/topics/${topicId}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
}

export default TopicService;