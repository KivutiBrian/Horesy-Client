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
    rooms: [],
    booking: [],
    events: []

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
    SET_USERS (state, users) {
      state.users = users
    },
    SET_ROOM_TYPES (state, payload) {
      state.room_types = payload
    },
    SET_ROOMS (state, payload) {
      state.rooms = payload
    },
    ADD_NEW_ROOM (state, payload) {
      state.rooms.push(payload)
    },
    PUSH_NEW_USER (state, user) {
      state.users.push(user)
    },
    SET_BOOKINGS (state, bookings) {
      state.booking = bookings
    },
    // destroy token
    CLEAR_ADMIN_TOKEN (state) {
      state.admin_token = null;
      axios.defaults.headers.common.Authorization = null;
    },
    SET_CALENDER_EVENTS (state, payload) {
      state.events = payload
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
            // console.log("add_user_response", response.data)
            context.commit('PUSH_NEW_USER', response.data)
            resolve(response.data)
          })
          .then(error => {
            // console.log('error_add_user', error)
            reject(error)
          })
      })
    },

    GET_ALL_USERS (context, payload) {
      return new Promise((resolve, reject) => {
        HTTP.get(`usr`)
          .then(response => {
            context.commit('SET_USERS', response.data)
          })
          .catch(error => reject(error))
      })
    },

    POST_BOOKING (ocntext, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        HTTP.post(`bookings`, payload)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    GET_BOOKINGS (context) {
      const adminToken = localStorage.getItem('token')
      // eslint-disable-next-line dot-notation
      HTTP.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`
      return new Promise((resolve, reject) => {
        HTTP.get(`bookings`)
          .then(response => {
            context.commit('SET_BOOKINGS', response.data)
            // console.log(response.data)
            resolve(response.data)
          })
          .catch(error => reject(error))
      })
    },

    CALENDER_BOOKINGS (context) {
      const adminToken = localStorage.getItem('token')
      // eslint-disable-next-line dot-notation
      HTTP.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`
      return new Promise((resolve, reject) => {
        HTTP.get('bookings/calender')
          .then(response => {
            context.commit('SET_CALENDER_EVENTS', response.data)
            console.log(response.data)
            resolve(response.data)
          })
          .catch(error => reject(error))
      })
    },

    // logged in user
    RETRIEVE_USER (context) {
      context.commit("SET_LOADING_STATUS", true);
      const adminToken = localStorage.getItem('token')
      HTTP.defaults.headers.common.Authorization = `Bearer ${adminToken}`;
      return new Promise((resolve, reject) => {
        HTTP.get(`usr/users/me`)
          .then(res => {
            context.commit("SET_USER", res.data)
            // console.log(res.data)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // log out user
    DESTROY_ADMIN_TOKEN (context) {
      return new Promise((resolve, reject) => {
        if (context.getters.adminloggedIn) {
          localStorage.removeItem('admin_token')
          context.commit("CLEAR_ADMIN_TOKEN")
          resolve()
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
        }
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
    },

    totalBookings (state) {
      return state.booking.length
    },

    calender_events (state) {
      return state.events
    }

  },
  modules: {
  }
})
