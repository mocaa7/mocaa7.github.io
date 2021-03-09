const oldUrl = 'https://wbdv-generic-server.herokuapp.com/api/001367674';
const localUrl = 'http://localhost:8080/api';
const herokuUrl = 'https://serene-island-60523.herokuapp.com/api';

const getBaseUrl = () => herokuUrl;

class WidgetService {
    async createWidget(topicId, widget) {
        const response = await fetch(`${getBaseUrl()}/topics/${topicId}/widgets`, {
            method: 'POST',
            body: JSON.stringify(widget),
            headers: {'content-type': 'application/json'}
        });
        return await response.json();
    }
    
    async findWidgetsForTopic(topicId) {
        const response = await fetch(`${getBaseUrl()}/topics/${topicId}/widgets`);
        return await response.json();
    }
  
    async updateWidget(widgetId, widget) {
      const response = await fetch(`${getBaseUrl()}/widgets/${widgetId}`, {
        method: 'PUT',
        body: JSON.stringify(widget),
        headers: {'content-type': 'application/json'}
      });
      return await response.json();
    }
  
    async deleteWidget(widgetId) {
        const response = await fetch(`${getBaseUrl()}/widgets/${widgetId}`, {
            method: 'DELETE'
        });
        return await response.json();
    }

    async saveAllWidgets(topicId, widgets) {
        const response = await fetch(`${getBaseUrl()}/topics/${topicId}/widgets`, {
            method: 'PUT',
            body: JSON.stringify(widgets),
            headers: {'content-type': 'application/json'}
        });
        return await response.json();
    }

    async findAllWidgets() {
        const response = await fetch(`${getBaseUrl()}/widgets`);
        return await response.json();
    }
    
    async findWidgetById(widgetId) {
        const response = await fetch(`${getBaseUrl()}/widgets/${widgetId}`);
        return await response.json();
    }
  }
  
  export default WidgetService;