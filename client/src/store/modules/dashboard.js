import dashboardService from "@/services/dashboardService";
import { getCurrentAcademicYear } from '../../utils/academicYear';

export default {
  namespaced: true,

  state: {
    stats: null,
    enrollmentsByCourse: [],
    teacherLoads: [],
    subjectsDistribution: [],
    professorsByDepartment: [],
    recentEnrollments: [],
    loading: false,
    error: null,
    currentAcademicYear: getCurrentAcademicYear(),
  },

  getters: {
    stats: (state) => state.stats,
    enrollmentsByCourse: (state) => state.enrollmentsByCourse,
    teacherLoads: (state) => state.teacherLoads,
    subjectsDistribution: (state) => state.subjectsDistribution,
    professorsByDepartment: (state) => state.professorsByDepartment,
    recentEnrollments: (state) => state.recentEnrollments,
    loading: (state) => state.loading,
    error: (state) => state.error,
    currentAcademicYear: (state) => state.currentAcademicYear,
  },

  mutations: {
    SET_STATS(state, stats) {
      state.stats = stats;
    },
    SET_ENROLLMENTS_BY_COURSE(state, enrollments) {
      state.enrollmentsByCourse = enrollments;
    },
    SET_TEACHER_LOADS(state, loads) {
      state.teacherLoads = loads;
    },
    SET_SUBJECTS_DISTRIBUTION(state, distribution) {
      state.subjectsDistribution = distribution;
    },
    SET_PROFESSORS_BY_DEPARTMENT(state, professors) {
      state.professorsByDepartment = professors;
    },
    SET_RECENT_ENROLLMENTS(state, enrollments) {
      state.recentEnrollments = enrollments;
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
    SET_ACADEMIC_YEAR(state, year) {
      state.currentAcademicYear = year;
    },
    SET_SEMESTER(state, semester) {
      state.currentSemester = semester;
    },
  },

  actions: {
    async fetchStats({ commit, state }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await dashboardService.getStats(
          state.currentAcademicYear,
          state.currentSemester
        );
        commit("SET_STATS", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch stats"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchEnrollmentsByCourse({ commit, state }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await dashboardService.getEnrollmentsByCourse(
          state.currentAcademicYear,
          state.currentSemester
        );

        console.log( state.currentAcademicYear)
        console.log(  state.currentSemester)

        commit("SET_ENROLLMENTS_BY_COURSE", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch enrollments"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchTeacherLoads({ commit, state }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await dashboardService.getTeacherLoads(
          state.currentAcademicYear,
          state.currentSemester
        );
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

    async fetchSubjectsDistribution({ commit }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await dashboardService.getSubjectsDistribution();
        commit("SET_SUBJECTS_DISTRIBUTION", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message ||
            "Failed to fetch subject distribution"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchProfessorsByDepartment({ commit }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await dashboardService.getProfessorsByDepartment();
        commit("SET_PROFESSORS_BY_DEPARTMENT", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch professors"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchRecentEnrollments({ commit }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await dashboardService.getRecentEnrollments();
        commit("SET_RECENT_ENROLLMENTS", response.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch recent enrollments"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchAllDashboardData({ commit }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");

        const [
          statsResponse,
          enrollmentsResponse,
          teacherLoadsResponse,
          subjectsResponse,
          professorsResponse,
          recentEnrollmentsResponse,
        ] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getEnrollmentsByCourse(),
          dashboardService.getTeacherLoads(),
          dashboardService.getSubjectsDistribution(),
          dashboardService.getProfessorsByDepartment(),
          dashboardService.getRecentEnrollments(),
        ]);

        commit("SET_STATS", statsResponse.data);
        commit("SET_ENROLLMENTS_BY_COURSE", enrollmentsResponse.data);
        commit("SET_TEACHER_LOADS", teacherLoadsResponse.data);
        commit("SET_SUBJECTS_DISTRIBUTION", subjectsResponse.data);
        commit("SET_PROFESSORS_BY_DEPARTMENT", professorsResponse.data);
        commit("SET_RECENT_ENROLLMENTS", recentEnrollmentsResponse.data);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch dashboard data"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    updateAcademicYear({ commit }, year) {
      commit("SET_ACADEMIC_YEAR", year);
    },

    updateSemester({ commit }, semester) {
      commit("SET_SEMESTER", semester);
    },
  },
};
