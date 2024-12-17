import reportService from "@/services/reportService";

export default {
  namespaced: true,

  state: {
    enrollmentStats: [],
    teacherLoads: [],
    studentGrades: null,
    subjectStats: [],
    departmentFaculty: [],
    loading: false,
    error: null,
  },

  getters: {
    enrollmentStats: (state) => state.enrollmentStats,
    teacherLoads: (state) => state.teacherLoads,
    studentGrades: (state) => state.studentGrades,
    subjectStats: (state) => state.subjectStats,
    departmentFaculty: (state) => state.departmentFaculty,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },

  mutations: {
    SET_ENROLLMENT_STATS(state, stats) {
      state.enrollmentStats = stats;
    },
    SET_TEACHER_LOADS(state, loads) {
      state.teacherLoads = loads;
    },
    SET_STUDENT_GRADES(state, grades) {
      state.studentGrades = grades;
    },
    SET_SUBJECT_STATS(state, stats) {
      state.subjectStats = stats;
    },
    SET_DEPARTMENT_FACULTY(state, faculty) {
      state.departmentFaculty = faculty;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },

  actions: {
    async fetchEnrollmentStatistics({ commit }, { academicYear, semester }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await reportService.getEnrollmentStatistics(academicYear, semester);
        commit("SET_ENROLLMENT_STATS", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch enrollment statistics"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchTeacherLoads({ commit }, { academicYear, semester }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await reportService.getTeacherLoads(academicYear, semester);
        commit("SET_TEACHER_LOADS", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch teacher loads"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchStudentGrades({ commit }, { studentId, academicYear, semester }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await reportService.getStudentGrades(studentId, academicYear, semester);
        commit("SET_STUDENT_GRADES", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch student grades"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchSubjectStatistics({ commit }, { academicYear, semester }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await reportService.getSubjectStatistics(academicYear, semester);
        commit("SET_SUBJECT_STATS", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch subject statistics"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchDepartmentFaculty({ commit }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await reportService.getDepartmentFaculty();
        commit("SET_DEPARTMENT_FACULTY", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch department faculty"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};