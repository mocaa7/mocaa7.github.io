import {
  CREATE_LESSON,
  DELETE_LESSON,
  UPDATE_LESSON,
  FIND_ALL_LESSONS_FOR_MODULE}
  from "../actions/lessonActions";

const lessonReducer = (state = {lessons: []}, action) => {
  switch(action.type) {
    case FIND_ALL_LESSONS_FOR_MODULE:
      return {lessons: action.lessons};
    case CREATE_LESSON:
      return {lessons: [...state.lessons, action.newLesson]};
    case DELETE_LESSON:
      return {lessons: state.lessons.filter(
        lesson => lesson._id !== action.lessonId)};
    case UPDATE_LESSON:
      return {lessons: state.lessons.map(lesson =>
        lesson._id === action.lessonId ? action.lesson : lesson)};
    default:
      return state
  }
};

export default lessonReducer