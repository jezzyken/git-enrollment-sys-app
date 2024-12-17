import api from './api';

export default {
  getEnrollmentStatistics(academicYear, semester) {
    return api.get('/report/enrollment-statistics', {
      params: { academicYear, semester }
    });
  },

  getTeacherLoads(academicYear, semester) {
    return api.get('/report/teacher-loads', {
      params: { academicYear, semester }
    });
  },

  getStudentGrades(studentId, academicYear, semester) {
    return api.get(`/report/student-grades/${studentId}`, {
      params: { academicYear, semester }
    });
  },

  getSubjectStatistics(academicYear, semester) {
    return api.get('/report/subject-statistics', {
      params: { academicYear, semester }
    });
  },

  getDepartmentFaculty() {
    return api.get('/report/department-faculty');
  }
};