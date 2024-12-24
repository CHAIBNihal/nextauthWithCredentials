"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOutBtn = () => {
  return (
    <div>
      <button onClick={()=>signOut()} className='bg-red-400 p-3 rounded-lg shadow-sm'>Sign out</button>
    </div>
  )
}

export default SignOutBtn
