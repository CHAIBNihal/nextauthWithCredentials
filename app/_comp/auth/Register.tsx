"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const router = useRouter()
    // handler 
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!name || !email || !password) {
            setErr('All fields are required')
            return;
        }
        
        

        try {
            const res = await fetch("/api/Register", {
                method : "POST",
                headers : {"content-Type" : "application/json"},
                body : JSON.stringify({
                    name,
                    email,
                    password
                })
            })
          

            if(res.ok){
                const form = e.target;
                form.reset()
                setErr("")
                router.push('/auth/signin')
            }
                const errData = await res.json()
                setErr(errData.message || "Registration failed ")
            

            
        } catch (error) {
            setErr('An error occurred. Please try again.')
        }
    }
   
    return (
        <div className='grid h-screen place-items-center '>
            <div className='rounded-lg shadow-lg border-t-4 border-yellow-100 py-3 px-10'>
                <h1 className='font-bold text-xl  text-center  mb-3 mt-4 '>
                    Your Details
                </h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 px-2 '>
                    <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Full Name' />
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='example@gmail.com' />
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />

                    <div className='flex flex-col'>
                        <button className='py-2 px-3 bg-gray-500 justify-center rounded-lg font-bold hover:bg-gray-300'
                            type='submit'>Register</button>
                    </div>
                    <Link className='flex justify-between' href="/auth/signin">
                        do you have already an account?<span className='underline'>
                            Login
                        </span>

                    </Link>

                    {
                        err && (
                            <div className='bg-red-300 py-2 px-3 rounded-lg'>
                                <p>
                                    {err} </p>
                            </div>
                        )
                    }
                </form>

            </div>


        </div>
    )
}

export default Register
