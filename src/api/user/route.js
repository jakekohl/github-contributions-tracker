import { getEnv, waitUntil } from '@vercel/functions'

export function GET() {
  const country = request.headers.get('x-vercel-ip-country')
  // Returns a response immediately while keeping the function alive
  waitUntil(fetch(`https://api.vercel.app/countries/?incr=${country}`))
  return new Response(`You're visiting from beautiful ${country}`)
}
