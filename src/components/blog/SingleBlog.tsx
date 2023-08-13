"use client"

import { SafeUser, safeBlogs } from "@/types"
import Image from "next/image"
import { RiDeleteBin5Line } from "react-icons/ri"
import { BsFillPencilFill } from "react-icons/bs"
import { useRouter } from "next/navigation"
import axios from "axios"

interface BlogProps{
    key: string
    data: safeBlogs
    currentUser?: SafeUser | null
}

export default function SingleBlog({data,key,currentUser}: BlogProps){

  const router = useRouter();

  const onDelete = () => (
    axios.delete(`/api/blog/${data.id}`)
    .then(() => {
      router.refresh()
    })
    .catch((error) => { 
      throw new Error(error)
    })
    .finally(() =>{
      router.push("/")
     })
    )

    const createdAt = new Date(data.createdAt).toLocaleTimeString('ru', {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute:'2-digit'}).replace(" г. в", ",");
    
    return(
        <div className='w-[1100px] border-2 p-4'>
        <div>
          <div className='flex gap-2 justify-between items-center'>
            <Image src={data.imageSrc} width={400} height={300} alt='Blog Image'/>
            <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <p className="cursor-pointer hover:text-blue-400" onClick={() => router.push(`/profile/${data.userId}`)}>{data.authorName}</p>
                <p className="capitalize">{createdAt}</p>
                <div onClick={() => router.push(`/blog/${data.id}`)} className="cursor-pointer hover:text-blue-400">More</div>
            </div>
          </div>
          {((data.userId === currentUser?.id) || (currentUser?.isAdmin === true)) &&(
            <div className="flex items-center gap-4 mt-4">
                <RiDeleteBin5Line onClick={onDelete} className="cursor-pointer text-[1.5rem]" />
                <BsFillPencilFill onClick={() => router.push(`/blog/${data.id}`)} className="cursor-pointer text-[1.2rem]"/>
            </div>
          )}
        </div>
      </div>
    )
}