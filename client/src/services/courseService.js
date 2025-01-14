import api from './api';

export default {
  getCourses() {
    return api.get('/course');
  },

  getCourse(id) {
    return api.get(`/course/${id}`);
  },

  getCourseByDepartment(id) {
    return api.get(`/course/department/${id}`);
  },

  createCourse(courseData) {
    return api.post('/course', courseData);
  },

  updateCourse(id, courseData) {
    return api.patch(`/course/${id}`, courseData);
  },

  deleteCourse(id) {
    return api.delete(`/course/${id}`);
  },
};