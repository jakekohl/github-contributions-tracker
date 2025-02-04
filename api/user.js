import {
  getSingleUserById,
  getSingleUserByEmail,
  getSingleUserByUsername,
  getUsers,
  addUser,
} from './_user.js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const { id, email, username } = Object.fromEntries(searchParams.entries())

  if (id) {
    console.debug(`Getting user by id: ${id}`)
    return new Response(await getSingleUserById(id), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } else if (email) {
    console.debug(`Getting user by email: ${email}`)
    return new Response(await getSingleUserByEmail(email), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } else if (username) {
    console.debug(`Getting user by username: ${username}`)
    return new Response(await getSingleUserByUsername(username), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } else {
    console.debug('Getting all users')
    return new Response(await getUsers(), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request) {
  console.debug(request)
  const { body } = request
  console.debug(`Adding user: ${JSON.stringify(body)}`)
  return new Response(await addUser(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
