"use client"
import React, {useState} from 'react'
import Link from 'next/link'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const Login = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const router = useRouter()

    // handler 
    const handleSubmit = async (e : any)=>{
        e.preventDefault()
        if(!email || !password){
            setErr('All fields are required')
          return;
        }
        try {
        const res =   await signIn("credentials", {email,password, redirect : false})
        if(res?.error){
          setErr('Invalid Credentials')
          return;
        }
        router.push('/')
        } catch (error) {
          console.log("The error is occured ", error)
        }

    }
  return (
    <div className='grid h-screen place-items-center '>
     <div className='rounded-lg shadow-lg border-t-4 border-yellow-100 py-3 px-10'>
     <h1 className='font-bold text-xl  text-center  mb-3 mt-4 '>
        Log In
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3 px-2 '>
                
                <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='example@gmail.com'/>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password' />

                <div className='flex flex-col'>
            <button className='py-2 px-3 bg-gray-500 justify-center rounded-lg font-bold hover:bg-gray-300'>Login</button>
        </div>
                <Link href="/auth/register">
                create an account!<span className='underline'>
                Register
                </span>

                </Link>

                {
                    err && (
                        <div className='bg-blue-300 py-2 px-3 rounded-lg mb-3 shadow-sm text-center'>
                    <p>
                        {err }! </p>
                </div>
                    )
                }
            </form>
        
     </div>
            
        
    </div>
  )
}

export default Login
