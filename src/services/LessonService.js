const moduleUrl = 'https://wbdv-generic-server.herokuapp.com/api/001367674/modules';
const lessonUrl = 'https://wbdv-generic-server.herokuapp.com/api/001367674/lessons';

class LessonService {
  async createLesson (moduleId, lesson) {
    const response = await fetch(`${moduleUrl}/${moduleId}/lessons`, {
      method: 'POST',
      body: JSON.stringify(lesson),
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  }

  async findLessonsForModule (moduleId) {
    const response = await fetch(`${moduleUrl}/${moduleId}/lessons`);
    return await response.json();
  }

  async updateLesson (lessonId, lesson) {
    const response = await fetch(`${lessonUrl}/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify(lesson),
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  }

  async deleteLesson (lessonId) {
    const response = await fetch(`${lessonUrl}/${lessonId}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
}

export default LessonService;