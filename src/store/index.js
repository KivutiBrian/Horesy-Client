/* eslint-disable quotes */
/* eslint-disable semi */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

export default new Vuex.Store({
  state: {
    loading: false,
    token: localStorage.getItem('token') || null,
    user: null,
    users: [],
    room_types: [],
    rooms: []

  },
  mutations: {
    // update loading status
    SET_LOADING_STATUS (state, payload) {
      state.loading = payload;
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    },
    SET_ROOM_TYPES (state, payload) {
      state.room_types = payload
    },
    SET_ROOMS (state, payload) {
      state.rooms = payload
    },
    ADD_NEW_ROOM (state, payload) {
      state.rooms.push(payload)
    }

  },
  actions: {
    // login
    LOGIN (context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('SET_LOADING_STATUS', true)
        const params = new URLSearchParams();
        params.append('username', payload.email);
        params.append('password', payload.password);

        // MAKE HTTP CALL TO BACKEND TO RETRIVE ACCESS TOKEN
        HTTP.post(`auth/token`, params)
          .then(response => {
            // console.log('response', response)
            const token = response.data.access_token
            const user = response.data.user
            localStorage.setItem('token', token)
            context.commit('SET_TOKEN', token)
            context.commit('SET_USER', user)
            resolve(response.data)
          })
          .catch(error => {
            console.log("error", error)
            reject(error)
          })
      })
    },

    // GET A LIST OF ALL ROOM TYPES
    FETCH_ALL_ROOM_TYPES (context, payload) {
      return new Promise((resolve, reject) => {
        HTTP.get(`rooms/types/all`)
          .then(response => {
            // console.log("all_room_types", response.data)
            context.commit('SET_ROOM_TYPES', response.data)
            resolve(response.data)
          })
          .catch(error => {
            console.log('error', error)
            reject(error)
          })
      })
    },

    // GET A LIST OF ALL ROOMS
    FETCH_ALL_ROOMS (context, payload) {
      return new Promise((resolve, reject) => {
        // make HTTP CALL TO FETCH ALL ROOMS
        HTTP.get(`rooms/`)
          .then(response => {
            // console.log("all_rooms_data", response.data)
            context.commit('SET_ROOMS', response.data)
            resolve(response)
          })
          .catch(error => {
            // console.log("errors", error)
            reject(error)
          })
      })
    },

    // ADD NEW ROOM DETAILS
    ADD_NEW_ROOM (context, payload) {
      const adminToken = localStorage.getItem('token')
      // eslint-disable-next-line dot-notation
      HTTP.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
      return new Promise((resolve, reject) => {
        // make HTTP CALL TO ADD ROOM
        HTTP.post(`rooms`, payload)
          .then(response => {
            // console.log("added_room", response.data)
            context.commit('ADD_NEW_ROOM', response.data)
            resolve(response.data)
          })
          .catch(error => {
            console.log("error", error)
            reject(error)
          })
      })
    },

    ADD_NEW_USER (context, payload) {
      const adminToken = localStorage.getItem('token')
      // eslint-disable-next-line dot-notation
      HTTP.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`
      const formattedPaylod = {
        full_name: payload.full_name,
        email: payload.email,
        phone: payload.phone,
        password: payload.phone
      }
      return new Promise((resolve, reject) => {
        HTTP.post(`auth/register?role=${payload.role}`, formattedPaylod)
          .then(response => {
            console.log("add_user_response", response.data)
            resolve(response.data)
          })
          .then(error => {
            // console.log('error_add_user', error)
            reject(error)
          })
      })
    }

  },
  getters: {
    adminloggedIn (state) {
      return state.token !== null;
    },

    totalRooms (state) {
      return state.rooms.length
    },

    totalUsers (state) {
      return state.users.length
    }

  },
  modules: {
  }
})
