import {
  CREATE_MODULE,
  DELETE_MODULE,
  UPDATE_MODULE,
  FIND_ALL_MODULES_FOR_COURSE}
  from '../actions/moduleActions'

const moduleReducer = (state = {modules: []}, action) => {
  switch(action.type) {
    case FIND_ALL_MODULES_FOR_COURSE:
      // Call the service to get all the modules for action.courseId, and set the modules
      // in the state to the new modules.

      // Someone, somewhere will do something like this:
      // dispatch({ type: "setSelectedCourse", "i-am-a-course-id"});
      return {modules: action.modules};
    case CREATE_MODULE:
      return {modules: [...state.modules, action.newModule]};
    case DELETE_MODULE:
      return {modules: state.modules.filter(module => module._id !== action.moduleId)};
    case UPDATE_MODULE:
      return {modules: state.modules.map(module =>
        module._id === action.moduleId ? action.module : module)};
    default:
      return state
  }
};

export default moduleReducer;