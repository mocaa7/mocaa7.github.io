const courseUrl = 'https://wbdv-generic-server.herokuapp.com/api/001367674/courses';
const moduleUrl = 'https://wbdv-generic-server.herokuapp.com/api/001367674/modules';

class ModuleService {
  async createModule (courseId, module) {
    const response = await fetch(`${courseUrl}/${courseId}/modules`, {
      method: 'POST',
      body: JSON.stringify(module),
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  }

  async findModulesForCourse (courseId) {
    const response = await fetch(`${courseUrl}/${courseId}/modules`);
    return await response.json();
  }

  async getModule(moduleId) {
    const response = await fetch(`${moduleUrl}/${moduleId}`);
    return await response.json();
  }

  async updateModule (moduleId, module) {
    const response = await fetch(`${moduleUrl}/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(module),
      headers: {'content-type': 'application/json'}
    });
    return await response.json();
  }

  async deleteModule (moduleId) {
    const response = await fetch(`${moduleUrl}/${moduleId}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
}

export default ModuleService;