import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
import jwt_decode from 'jwt-decode'

import { setAuthToken } from './util/session_api_util'
import { logout } from './actions/session_actions'

// We will store a boolean value in our state to indicate that the user is authenticated. We can map this slice of state to our components to selectively render information depending on whether our user is logged in. It may seem a bit counterintuitive to set up logout before login, but we want to start building our app from the entry file and will need to handle logout there.

document.addEventListener('DOMContentLoaded', () => {
  let store

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)

    const decodedUser = jwt_decode(localStorage.jwtToken)
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    }

    store = configureStore(preloadedState)

    const currentTime = Date.now() / 1000

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout())
      window.location.href = '/login'
    }
  } else {
    store = configureStore({})
  }
  const root = document.getElementById('root')

  ReactDOM.render(<Root store={store} />, root)
})
