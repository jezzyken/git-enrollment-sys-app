import api from './api';

export default {
  getAllTeacherLoads(query = {}) {
    return api.get('/teacher-load', { params: query });
  },

  getTeacherLoadsForProfessor(professorId) {
    return api.get(`/teacher-load/professor/${professorId}`);
  },

  getTeacherLoad(id) {
    return api.get(`/teacher-load/${id}`);
  },

  createTeacherLoad(loadData) {
    return api.post('/teacher-load', loadData);
  },

  updateTeacherLoad(id, loadData) {
    return api.patch(`/teacher-load/${id}`, loadData);
  },

  deleteTeacherLoad(id) {
    return api.delete(`/teacher-load/${id}`);
  },

  checkConflictSchedule(data) {
    if (!data.professorId) {
      throw new Error('Professor ID is required');
    }
    return api.post('/teacher-load/check-conflicts', data);
  }
};