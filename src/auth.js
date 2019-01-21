import auth0 from 'auth0-js'
import Vue from 'vue'
import axios from 'axios'

let webAuth = new auth0.WebAuth({
  domain: 'hardfi.eu.auth0.com',
  clientID: 'rWzJXurRSvqhfScq8Yc24tvqwZOucLno',
  redirectUri: 'http://localhost:8080/callback',
  responseType: 'token id_token',
  scope: 'openid profile user_metadata app_metadata'
})

let auth = new Vue({
  computed: {
    token: {
      get: function () {
        return localStorage.getItem('id_token')
      },
      set: function (id_token) {
        localStorage.setItem('id_token', id_token)
      }
    },
    accessToken: {
      get: function () {
        return localStorage.getItem('access_token')
      },
      set: function (accessToken) {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get: function () {
        return localStorage.getItem('expires_at')
      },
      set: function (expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt)
      }
    },
    user: {
      get: function () {
        return JSON.parse(localStorage.getItem('user'))
      },
      set: function (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  },
  methods: {
    login () {
      webAuth.authorize()
    },
    logout () {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')
        webAuth.authorize()
        webAuth.logout(
          { returnTo: 'http://localhost:8080/callback' }
        )
      })
    },
    isAuthenticated () {
      return new Date().getTime() < this.expiresAt
    },
    handleAuthentication () {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {

            // const AuthStr = 'Bearer '.concat(authResult.accessToken)
            // axios.get('https://hardfi.eu.auth0.com/userinfo', { headers: { Authorization: AuthStr } })
            //   .then(response => {
            //     console.log(response.data)
            //   })
            //   .catch((error) => {
            //     console.log('error ' + error)
            //   })

            this.expiresAt = authResult.expiresIn
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()
          } else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$auth = auth
  }
}
