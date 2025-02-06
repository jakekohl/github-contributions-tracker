import { getUserAccessToken, getGitHubUserProfile } from './_githubCallback'
import { addUser } from '../_user'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const { code } = Object.fromEntries(searchParams.entries())
  const { headers } = request

  // Validate the request to ensure it's coming from GitHub and that a temporary code is provided
  if (headers?.Origin && headers.Origin !== 'https://github.com') {
    return new Response('Bad Request', {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  } else if (headers?.Referer && headers.Referer !== 'https://github.com') {
    return new Response('Bad Request', {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  } else if (!code) {
    return new Response('Bad Request', {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  } else {
    console.debug(`Received code: ${code}`)

    try {
      // Get the user's access token
      const accessToken = await getUserAccessToken(code)

      // Using the access token, call the function to get the user's GitHub information to create an app user
      const githubUserDetails = await getGitHubUserProfile(accessToken)

      // Compile the user's information and create the app user
      const user = {
        username: githubUserDetails.login,
        name: githubUserDetails.name,
        email: githubUserDetails.email,
        github: githubUserDetails,
      }
      const userId = await addUser(user)
      return new Response(
        { message: `User ${userId} created successfully!` },
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      return new Response(
        { message: `Something went wrong.`, error },
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  }
}
