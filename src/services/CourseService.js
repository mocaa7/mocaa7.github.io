const url = 'https://wbdv-generic-server.herokuapp.com/api/001367674/courses';

class CourseService {

  async createCourse (course) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  };

  async findAllCourses () {
    const response = await fetch(url);
    return await response.json();
  }

  async findCourseById (courseId) {
    const response = await fetch(`${url}/${courseId}`);
    return await response.json();
  }
  
  async updateCourse (courseId, course) {
    const response = await fetch(`${url}/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(course),
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  }

  async deleteCourse (courseId) {
    const response = await fetch(`${url}/${courseId}`, {
      method: 'DELETE'
    });
    return await response.json();
  };
}

export default CourseService;