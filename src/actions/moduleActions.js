export const CREATE_MODULE = 'CREATE_MODULE';
export const DELETE_MODULE = 'DELETE_MODULE';
export const FIND_ALL_MODULES_FOR_COURSE = 'FIND_ALL_MODULES_FOR_COURSE';
export const UPDATE_MODULE = 'UPDATE_MODULE';

export const createModule = (module, courseId) => ({
  title: 'New Module',
  _id:(new Date()).getTime()+"",
  courseId: courseId,
  type: CREATE_MODULE,
  newModule: module
});

export const deleteModule = (moduleId) => ({
  type: DELETE_MODULE,
  moduleId: moduleId
});

export const findAllModulesForCourse = (modules) => ({
  type: FIND_ALL_MODULES_FOR_COURSE,
  modules: modules
});

export const updateModule = (module) => ({
  title: module.title,
  type: UPDATE_MODULE,
  module: module
});

export default {CREATE_MODULE, DELETE_MODULE, FIND_ALL_MODULES_FOR_COURSE, UPDATE_MODULE,
  deleteModule, createModule, findAllModulesForCourse, updateModule}