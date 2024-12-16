import api from './api';
import { getCurrentAcademicYear } from '../utils/academicYear';

export default {
  async getStats() {
    const year = getCurrentAcademicYear();
    return api.get('/dashboard/stats', {
      params: { academicYear: year }
    });
  },

  async getEnrollmentsByCourse() {
    const year = getCurrentAcademicYear();
    return api.get('/dashboard/enrollments/by-course', {
      params: { academicYear: year }
    });
  },

  async getTeacherLoads() {
    const year = getCurrentAcademicYear();
    return api.get('/dashboard/teacher-loads', {
      params: { academicYear: year }
    });
  },

  getSubjectsDistribution() {
    return api.get('/dashboard/subjects/distribution');
  },

  getProfessorsByDepartment() {
    return api.get('/dashboard/professors/by-department');
  },

  getRecentEnrollments() {
    return api.get('/dashboard/recent-enrollments');
  }
};