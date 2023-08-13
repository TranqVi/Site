"use client"
import axios from "axios"
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import ImageUpload from "../input/ImageUpload"
import Input from "../input/input"
import { useRouter } from "next/navigation"
import { ISODateString } from "next-auth"
// import { toast } from "react-toastify"
import { SafeUser } from "@/types"


interface BlogProps{
    name?:string
    description?:string
    imageSrc?:any
    blogId?:string,
    authorName?:string,
    createdAt?: ISODateString,
    currentUser?: SafeUser | null,
    userId?:string,
    content?:string
}

interface InitialStateProps{
    name:string,
    description:string,
    imageSrc:string,
    content:string

}

const initialState:InitialStateProps = {
    name:"",
    description: "",
    imageSrc: "",
    content: ""
}

export default function BlogId({name,description,imageSrc,blogId,authorName,createdAt,currentUser,userId,content}:BlogProps){
    
    const router = useRouter();
    const [state,setState] = useState(initialState)
    const [onActive, setOnActive] = useState(false)

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    }

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const onDelete = (event:FormEvent) => {
        event.preventDefault()

        axios.delete(`/api/blog/${blogId}`)
        .then(() => {
            router.refresh()
        })
        .catch((err) => {
            throw new Error(err)
            // toast.err("Something went wrong")
        })
        .finally(() => {
            router.push("/")
        })
    }

    const onSubmit = (event:FormEvent) => {
        
        event.preventDefault()

        axios.put(`/api/blog/${blogId}`, state)
        .then(() => {
            router.refresh()
        })
        .catch((err) => {
            throw new Error(err)
        })
        // setState(initialState)
        setOnActive(false)
    }

    const createdAtString = createdAt as string 
    const createdAtDate = new Date(createdAtString).toLocaleTimeString('ru', {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute:'2-digit'}).replace(" г. в", ",");
    return(
        <div className="mt-[30px]">
            <div className="flex items-center">
                <div className="flex-1 flex flex-col justify-between gap-[30px]">
                    <h1 className="text-[40px] font-[700]">
                        {name}
                    </h1>
                     <p className="text-[18px] font-[300] text-justify pr-[40px]">
                        {description}
                    </p>
                    <div className="flex items-center gap-[10px]">
                        <Image src={imageSrc} width={40} height={40} alt="Image" className="object-cover border-[50%]"/>
                        <span onClick={() => router.push(`/profile/${userId}`)} className="cursor-pointer hover:text-blue-400">{authorName}</span>
                    </div>
                    <span>{createdAtDate}</span>
                </div>
                <div className="flex-1 h-[300px] relative">
                    <Image src={imageSrc} alt='' fill={true} className="object-cover"/>
                </div>
            </div>
            <div className="mt-[50px] text-[20px] font-[300] text-justify text-[#878787]">
                <p>{content}</p>
            </div>
            {currentUser?.id && (<div className="flex justify-center gap-2">
                <button onClick={() => setOnActive(!onActive)} className="uppercase">Edit</button>
                <button className="uppercase" onClick={onDelete}>Delete</button>
            </div>)}
            {onActive && (
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
                        <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue("imageSrc", value)}/>
                        <Input placeholder="Name" id="name" type="text" value={state.name} name="name" onChange={handleChange}/>
                        <Input placeholder="Description" id="description" type="text" value={state.description || description} name="description" onChange={handleChange}/>
                        <Input big placeholder="Blog content" id="content" type="text" value={state.content || content} name="content" onChange={handleChange}/>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
    )
}
