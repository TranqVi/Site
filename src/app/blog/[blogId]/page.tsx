import getCurrentUser from "@/app/actions/getCurrentUser"
import getBlogsById from "@/app/actions/getBlogsById"
import BlogId from "@/components/blog/BlogId"

interface Iparams{
  blogId: string,
}

export default async function page({params}:{params:Iparams}) {

  const blog = await getBlogsById(params)
  const currentUser = await getCurrentUser()

  return (
    <div>
      <div>
        <BlogId currentUser={currentUser} name={blog?.name} description={blog?.description} blogId={blog?.id} imageSrc={blog?.imageSrc} authorName={blog?.authorName} createdAt={blog?.createdAt} userId={blog?.userId} content={blog?.content}/>
      </div>
    </div>
  )
}
