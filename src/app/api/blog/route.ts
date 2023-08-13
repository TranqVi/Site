import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb"

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request:Request
){
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return null
    }

    const body = await request.json()

    const {name, description, imageSrc, content} = body

    const blog = await prisma.blog.create({
        data: {
            name,
            imageSrc,
            description,
            content,
            userId: currentUser.id,
            authorName: currentUser.name
        }
    })
    return NextResponse.json(blog);
}
