import teacherLoadService from '@/services/teacherLoadService';

export default {
  namespaced: true,

  state: {
    teacherLoads: [],
    currentTeacherLoad: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_TEACHER_LOADS(state, loads) {
      state.teacherLoads = loads;
    },
    SET_CURRENT_TEACHER_LOAD(state, load) {
      state.currentTeacherLoad = load;
    },
    ADD_TEACHER_LOAD(state, load) {
      state.teacherLoads.push(load);
    },
    UPDATE_TEACHER_LOAD(state, updatedLoad) {
      const index = state.teacherLoads.findIndex(l => l._id === updatedLoad._id);
      if (index !== -1) {
        state.teacherLoads.splice(index, 1, updatedLoad);
      }
    },
    REMOVE_TEACHER_LOAD(state, loadId) {
      state.teacherLoads = state.teacherLoads.filter(l => l._id !== loadId);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async fetchTeacherLoads({ commit }, query = {}) {
      commit('SET_LOADING', true);
      try {
        const response = await teacherLoadService.getAllTeacherLoads(query);
        commit('SET_TEACHER_LOADS', response.data.data.teacherLoads);
        return response.data.data.teacherLoads;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch teacher loads');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchProfessorTeacherLoads({ commit }, professorId) {
      if (!professorId) return;
      commit('SET_LOADING', true);
      try {
        const response = await teacherLoadService.getTeacherLoadsForProfessor(professorId);
        commit('SET_TEACHER_LOADS', response.data.data.teacherLoads);
        return response.data.data.teacherLoads;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch professor teaching loads');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchTeacherLoad({ commit }, id) {
      if (!id) return;
      commit('SET_LOADING', true);
      try {
        const response = await teacherLoadService.getTeacherLoad(id);
        commit('SET_CURRENT_TEACHER_LOAD', response.data.data.teacherLoad);
        return response.data.data.teacherLoad;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch teacher load');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createTeacherLoad({ commit }, loadData) {
      commit('SET_LOADING', true);
      try {
        const response = await teacherLoadService.createTeacherLoad(loadData);
        commit('ADD_TEACHER_LOAD', response.data.data.teacherLoad);
        return response.data.data.teacherLoad;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to create teacher load');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async updateTeacherLoad({ commit }, { id, loadData }) {
      if (!id) return;
      commit('SET_LOADING', true);
      try {
        const response = await teacherLoadService.updateTeacherLoad(id, loadData);
        commit('UPDATE_TEACHER_LOAD', response.data.data.teacherLoad);
        return response.data.data.teacherLoad;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update teacher load');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async deleteTeacherLoad({ commit }, id) {
      if (!id) return;
      commit('SET_LOADING', true);
      try {
        await teacherLoadService.deleteTeacherLoad(id);
        commit('REMOVE_TEACHER_LOAD', id);
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to delete teacher load');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },

  getters: {
    getTeacherLoadById: (state) => (id) => {
      return state.teacherLoads.find(load => load._id === id);
    },
    getLoadsBySemester: (state) => (academicYear, semester) => {
      return state.teacherLoads.filter(load => 
        load.academicYear === academicYear && 
        load.semester === semester
      );
    },
    getTotalUnitsBySemester: (state) => (academicYear, semester) => {
      return state.teacherLoads
        .filter(load => 
          load.academicYear === academicYear && 
          load.semester === semester
        )
        .reduce((total, load) => total + (load.totalUnits || 0), 0);
    }
  }
};