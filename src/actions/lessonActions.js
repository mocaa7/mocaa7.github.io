export const CREATE_LESSON = 'CREATE_LESSON';
export const DELETE_LESSON = 'DELETE_LESSON';
export const FIND_ALL_LESSONS_FOR_MODULE = 'FIND_ALL_LESSONS_FOR_MODULE';
export const UPDATE_LESSON = 'UPDATE_LESSON';

export const createLesson = (moduleId, lesson) => ({
  title: 'New Lesson',
  _id:(new Date()).getTime()+"",
  moduleId: moduleId, 
  type: CREATE_LESSON,
  newLesson: lesson
});

export const deleteLesson = (lessonId) => ({
  type: DELETE_LESSON,
  lessonId: lessonId
});

export const findAllLessonsForModule = (lessons) => ({
  type: FIND_ALL_LESSONS_FOR_MODULE,
  lessons: lessons
});

export const updateLesson = (lesson) => ({
  title: lesson.title,
  type: UPDATE_LESSON,
  lesson: lesson
});

export default {CREATE_LESSON, DELETE_LESSON, FIND_ALL_LESSONS_FOR_MODULE, UPDATE_LESSON,
  deleteLesson, createLesson, findAllLessonsForModule, updateLesson}