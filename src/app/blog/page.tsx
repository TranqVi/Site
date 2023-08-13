import getCurrentUser from '../actions/getCurrentUser'
import getBlogs from '../actions/getBlogs'
import SingleBlog from '@/components/blog/SingleBlog'

export default async function page() {

  const currentUser = await getCurrentUser()
  const blogs = await getBlogs()

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      {blogs.map((item) => (
        <SingleBlog data={item} key={item.id} currentUser={currentUser}/>
      ))}
    </main>
  )
}
