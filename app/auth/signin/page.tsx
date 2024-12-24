import Login from '@/app/_comp/auth/Login'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/authOptions'
import { redirect } from 'next/navigation'
const LoginForm = async () => {
  const session = await getServerSession(authOptions)
  if(session) redirect('/')
  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginForm
