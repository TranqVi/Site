"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/components/input/input"
import ImageUpload from "@/components/input/ImageUpload"
import axios from "axios"
import { toast } from "react-toastify"

interface InitialStateProps{
    name?: string,
    imageSrc: string,
    description: string,
    authorName: string,
    content: string
}
 
const initialState:InitialStateProps = {
    name:"",
    imageSrc: "",
    description: "",
    authorName: "",
    content: ""
}

export default function page() {
    const [state, setState] = useState(initialState)
    const router = useRouter()

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    function handleChange(event:ChangeEvent<HTMLInputElement>){
        setState({...state, [event.target.name]:event.target.value})
    }

    const onSubmit = (event:FormEvent) => {
        
        event.preventDefault()

        axios.post("/api/blog", state)
        .then(() => {
            router.push("/blog")
        })
        .catch((err) => {
            throw new Error(err)
            // toast.error("Something went wrong") // можно везде!!
        })
        router.refresh()
    }

  return (
    <form className="w-[600px] h-[700px] mx-auto py-12" onSubmit={onSubmit}>
        <div> 
            <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue("imageSrc",value)}/>
        </div>
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
            <Input placeholder="Blog header" id="name" type="text" value={state.name} name="name" onChange={handleChange}/>
            <Input big placeholder="Blog description" id="description" type="text" value={state.description} name="description" onChange={handleChange}/>
            <Input big placeholder="Blog content" id="content" type="text" value={state.content} name="content" onChange={handleChange}/>
            <button type="submit">Sumbit</button>
        </div>
    </form>
  )
}
