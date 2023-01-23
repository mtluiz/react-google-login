import { useState, useEffect } from 'react'
import loadScript from './load-script'
import removeScript from './remove-script'

const useGoogleLogin = ({
  onSuccess = () => {},
  onFailure = () => {},
  onScriptLoadFailure,
  clientId,
  cookiePolicy,
  loginHint,
  hostedDomain,
  fetchBasicProfile,
  redirectUri,
  discoveryDocs,
  uxMode,
  scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
  accessType,
  jsSrc = 'https://accounts.google.com/gsi/client'
}) => {
  const [loaded, setLoaded] = useState(false)
  const [client, setClient] = useState({})

  async function handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
    const userdata = await (await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`)).json()
    res.googleId = userdata.id
    res.profileObj = {
      googleId: userdata.id,
      imageUrl: userdata.picture,
      email: userdata.email,
      name: userdata.name,
      givenName: userdata.given_name,
      familyName: userdata.family_name
    }
    onSuccess(res)
  }

  function signIn() {
    client.requestAccessToken()
  }

  useEffect(() => {
    const onLoadFailure = onScriptLoadFailure || onFailure
    loadScript(
      document,
      'script',
      'google-login',
      jsSrc,
      () => {
        const params = {
          client_id: clientId,
          cookie_policy: cookiePolicy,
          login_hint: loginHint,
          hosted_domain: hostedDomain,
          fetch_basic_profile: fetchBasicProfile,
          discoveryDocs,
          ux_mode: uxMode,
          redirect_uri: redirectUri,
          scope,
          access_type: accessType,
          callback: handleSigninSuccess
        }
        setClient(window.google.accounts.oauth2.initTokenClient(params))
        setLoaded(true)
      },
      err => {
        onLoadFailure(err)
      }
    )

    return () => {
      removeScript(document, 'google-login')
    }
  }, [])

  return { signIn, loaded }
}

export default useGoogleLogin
