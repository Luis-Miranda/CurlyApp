import { NextResponse } from 'next/server'

export async function GET() {
  // Borrar la cookie llamada "session"
  const response = NextResponse.redirect('/')
  response.cookies.set({
    name: 'session',
    value: '',
    path: '/',
    maxAge: 0,
  })
  return response
}