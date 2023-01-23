import React from 'react'
import { GoogleLogin } from '../src/index'
// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';

const clientId = '300774962201-2rkf3of1m9g0nrb3l502lcmu9sl1avo7.apps.googleusercontent.com'

const success = response => {
  console.log(response) // eslint-disable-line
}

const error = response => {
  console.error(response) // eslint-disable-line
}

const logout = () => {
  console.log('logout') // eslint-disable-line
}

export default () => (
  <div>
    <br />
    <br />
    <GoogleLogin onSuccess={success} onFailure={error} clientId={clientId} />
    <br />
    <br />
    <GoogleLogin theme="dark" onSuccess={success} onFailure={error} clientId={clientId} />
    <br />
    <br />
    <GoogleLogin theme="dark" style={{ background: 'blue' }} onSuccess={success} onFailure={error} clientId={clientId} />
    <br />
    <br />
  </div>
)
