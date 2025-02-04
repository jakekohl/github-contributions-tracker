export function GET() {
  const response = {
    status: 'ok',
    message: 'pong',
    branch: process.env.BRANCH,
    commit: process.env.COMMIT,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
