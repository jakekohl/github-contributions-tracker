import { getSingleUserById } from './_user.js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const { id } = Object.fromEntries(searchParams.entries())

  if (id) {
    console.debug(`Getting user by id: ${id}`)
    return new Response(await getSingleUserById(id), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } else {
    console.debug('No id provided')
    return new Response(
      { error: 'No id provided', code: 400 },
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
