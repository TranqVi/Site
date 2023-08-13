"use client"

import Input from '@/components/input/input'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

interface InitialStateProps{
    email: string,
    password: string
}

const initialState:InitialStateProps = {
    email: "",
    password: ""
}

const page = () => {

    const [state, setState] = useState(initialState);
    const router = useRouter();
    
    function handleChange(e:any) {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const onSubmit = (event:FormEvent) => {
        
        event.preventDefault()

        signIn("credentials", {
            ...state,
            redirect: false,
        }).then((callback) => {
            
            if(callback?.ok) {
                router.refresh()
            }

            if(callback?.error){
                throw new Error("Wrong Credentials")
            }
        })
        router.push("/")
    }

  return (
    <form className='text-center' onSubmit={onSubmit}>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
            <Input placeholder='Email' name='email' id='email' type="email" onChange={handleChange} value={state.email}/>
            <Input placeholder='Password' name='password' id='password' type="password" onChange={handleChange} value={state.password}/>
            <button type='submit'>Submit</button>
        </div>
        <div>
            <div>Haven't you got an account yet? <Link href="/register">Register</Link></div>
        </div>
    </form>
  )
}

export default page;
