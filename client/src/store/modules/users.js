import userService from '@/services/userService'

export default {
  namespaced: true,

  state: {
    users: [],
    currentUser: null,
    loading: false,
    error: null
  },

  getters: {
    users: state => state.users,
    currentUser: state => state.currentUser,
    loading: state => state.loading,
    error: state => state.error,
    getUserById: state => id => state.users.find(user => user._id === id),
    getAdminUsers: state => state.users.filter(user => 
      user.role && user.role.some(role => role.name === 'admin')
    ),
    getUsersByDepartment: state => deptId => state.users.filter(user => 
      user.academicInfo?.department?._id === deptId
    )
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user._id === updatedUser._id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
        if (state.currentUser?._id === updatedUser._id) {
          state.currentUser = updatedUser
        }
      }
    },
    REMOVE_USER(state, userId) {
      state.users = state.users.filter(user => user._id !== userId)
      if (state.currentUser?._id === userId) {
        state.currentUser = null
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },

  actions: {
    async fetchUsers({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        const { data } = await userService.getUsers()
        commit('SET_USERS', data)
        return data
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch users'
        commit('SET_ERROR', errorMessage)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchUser({ commit }, id) {
      try {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        const { data } = await userService.getUser(id)
        commit('SET_CURRENT_USER', data)
        return data
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch user'
        commit('SET_ERROR', errorMessage)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createUser({ commit }, userData) {
      try {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        const { data } = await userService.createUser(userData)
        commit('ADD_USER', data)
        return data
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to create user'
        commit('SET_ERROR', errorMessage)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateUser({ commit }, { id, userData }) {
      try {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        const { data } = await userService.updateUser(id, userData)
        commit('UPDATE_USER', data)
        return data
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update user'
        commit('SET_ERROR', errorMessage)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteUser({ commit }, id) {
      try {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        await userService.deleteUser(id)
        commit('REMOVE_USER', id)
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to delete user'
        commit('SET_ERROR', errorMessage)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  }
}