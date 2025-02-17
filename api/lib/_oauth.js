/*
  Utility functions for OAuth with GitHub
    Documentation: https://docs.github.com/en/developers/apps/building-oauth-apps

  https://github.com/login/oauth/authorize
*/

const scopes = ['repo:status', 'read:user', 'user:email']

export function startOAuthAuthorization() {
  const client_id = process.env.GH_CLIENT_ID
  const redirect_uri = process.env.APP_CALLBACK_URL
}
