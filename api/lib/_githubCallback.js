import axios from 'axios'
import { Octokit } from 'octokit'

/**
 * Takes the temp GitHub code and exchanges it for an access token
 *
 * @param {string} code
 * @returns {Promise<string>} The user's access token and scopes
 */
export async function getUserAccessToken(code) {
  const headers = {
    Accept: 'application/json',
  }
  const data = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code,
  }

  try {
    // Get the access token
    const response = await axios.post('https://github.com/login/oauth/access_token', data, {
      headers,
    })

    // Check to ensure we got an access_token and a list of scopes
    const { access_token, scope } = response.data
    if (!access_token) {
      throw new Error('No access token found in response')
    } else if (!scope) {
      throw new Error('No scope found in response')
    }

    // Check for the correct scopes
    const requiredScopes = process.env.GH_SCOPES.split(',')
    const missingScopes = requiredScopes.filter((requiredScope) => !scope.includes(requiredScope))
    if (missingScopes.length) {
      throw new Error(`Missing required scopes: ${missingScopes.join(', ')}`)
    }

    return access_token
  } catch (error) {
    console.error('Error getting access token:', error)
    throw new Error('Error getting access token')
  }
}

export async function getGitHubUserProfile(accessToken) {
  const octokit = new Octokit({
    auth: accessToken,
  })

  const userName = await octokit.graphql(`{
    viewer {
      login
    }
  }`).data.viewer.login

  const query = `
  query($userName: String!) {
    user(login: $userName) {
      id
      databaseId
      login
      email
      name
      avatarUrl
      location
      pronouns
      bio
      company
      socialAccounts(first: 3) {
          totalCount
          nodes {
              displayName
              provider
              url
          }
      }
      twitterUsername
      websiteUrl
      url
      createdAt
      updatedAt
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }`
  const variables = {
    userName,
  }
  try {
    return await octokit.graphql(query, variables)
  } catch (error) {
    console.error('Error getting user profile:', error)
    throw new Error('Error getting user profile')
  }
}
