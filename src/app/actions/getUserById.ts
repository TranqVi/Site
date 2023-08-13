import prisma from "../lib/prismadb"

interface IParams{
    profileId: string;
}

export default async function getUserById(
    params: IParams
) {
    try {
        const{profileId} = params;

        const user = await prisma.user.findUnique({
            where: {
                id:profileId
            },
        })

        if(!user){
            return null
        }

        return {
            ...user,
        }
    } catch (error:any) {
        throw new Error(error)
    }
}