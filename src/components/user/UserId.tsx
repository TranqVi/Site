"use client"

import Image from "next/image"
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react"

interface UserProps{
    name?:string
    email?:string | null
    image?:any | null
}

interface InitialStateProps{
    name:string,
    email:string,
}

const initialState:InitialStateProps = {
    name:"",
    email: "",
}

export default function UserId({name,email,image}:UserProps){
    
    return(
        <div className="w-[500px] mx-auto py-16 bg-blue-200 px-12 flex flex-col gap-4">
            <div className="flex flex-col border-b-2">
                <span>{name}</span>
            </div>
            <div>
                <span>{email}</span>
            </div>
            <Image src={image} width={400} height={300} alt=''/>
        </div>
    )
}
