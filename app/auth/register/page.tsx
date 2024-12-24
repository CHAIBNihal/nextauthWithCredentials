
import Register from '@/app/_comp/auth/Register'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/authOptions'
import { redirect } from 'next/navigation'

const page = async() => {
  const session = await getServerSession(authOptions)
  if(session){
      redirect('/')
  }
  return (
    
    <main>
        <Register />
    </main>
  )
}

export default page
