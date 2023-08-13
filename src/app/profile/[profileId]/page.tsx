import getUserById from "@/app/actions/getUserById"
import UserId from "@/components/user/UserId"

interface Iparams{
  profileId: string,
}

export default async function page({params}:{params:Iparams}) {

  const user = await getUserById(params)

  return (
    <div>
      <div>
        <UserId image={user?.image} name={user?.name} email={user?.email}/>
      </div>
    </div>
  )
}
