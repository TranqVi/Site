"use client"

import { SafeUser } from "@/types"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserMenuProps{
    currentUser: SafeUser | null
}

export default function Navbar({currentUser}:UserMenuProps) {
  return (
    <header>
        <nav className="h-[100px] flex justify-between items-center">
            <Link href="/" className="font-bold text-[22px] text-[#005bff]">Fair Price</Link>
            <div className="flex gap-[20px] items-center">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <Link href={currentUser ? "/create":"/login"}>Create</Link>
                {currentUser ? <Link href={`/profile/${currentUser.id}`}>Profile</Link> : null}
                {currentUser ? <Link href="/" onClick={() => signOut()} className="py-[5px] px-[10px] border-none bg-[#005bff] text-[white] cursor-pointer rounded-[10px]">Sign Out</Link> 
                : <Link className="py-[5px] px-[10px] border-none bg-[#005bff] text-[white] cursor-pointer rounded-[10px]" href="/login">Login</Link>}
            </div>
        </nav>
    </header>
  )
}
