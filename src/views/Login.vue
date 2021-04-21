<template>
    <div style="padding-top: 100px;" id="login">
    <v-app>
        <v-card width="400" class="mx-auto" style="background-color:#f1faee;" elevation="40">
          <v-alert type="error" class="mb-4" v-if="errorMessage">
            {{ errorMessage }}
          </v-alert>

          <v-card-title class="mt-5">
            <h3 class="mx-auto">Horesy Hotel</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid">
              <!-- ssssss<v-text-field v-model="email" :rules="emailRules" label="Email" prepend-icon="mdi-account-circle"></v-text-field> -->
              <v-text-field v-model="email" :rules="emailRules" label="email" autoComplete="off" prepend-icon="mdi-account-circle"></v-text-field>
              <v-text-field
              v-model="password"
              label="password"
              :type="showPassword ? 'text': 'password' "
              prepend-icon="mdi-lock"
              :append-icon="showPassword ?  'mdi-eye': 'mdi-eye-off' "
              @click:append="showPassword=!showPassword"
              :rules="passwordRules"></v-text-field>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-progress-linear
              :active="loading"
              :indeterminate="$store.state.loading"
              absolute
              bottom
              color="deep-purple accent-4"
            ></v-progress-linear>
            <v-btn class="mb-4" :disabled="!valid" block @click="login" color="success">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      showPassword: false,
      valid: true,
      email: '',
      password: '',
      errorMessage: '',
      loading: false,
      usernameRules: [
        value => !!value || 'Username is required',
        value => value.length >= 4 || 'Minimum of 4 characters required'
      ],
      emailRules: [
        value => !!value || 'Email is required',
        value => value.indexOf('@') !== 0 || 'Email should have a username',
        value => value.includes('@') || 'Email should include an @ symbol',
        value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain',
        value => value.indexOf('.') <= value.length - 3 || 'Email should contain a valid domain extension'
      ],
      passwordRules: [
        value => !!value || 'Password is required'
      ]
    }
  },
  computed: {
  },
  methods: {

    // spead the mapaction
    ...mapActions(['LOGIN']),

    login (e) {
      console.log('Hello')
      // prevent default
      e.preventDefault()
      // call the login action
      this.LOGIN({
        email: this.email,
        password: this.password
      }).then(data => {
        console.log('data', data)
        this.$router.push({ path: '/admin/dashboard' })
      }).catch(error => {
        console.log('error2', error)
      })
    }
  }
}
</script>

<style>
</style>
