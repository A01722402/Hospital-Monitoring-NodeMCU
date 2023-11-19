import Link from 'next/link'
import SideBar from '../components/SideBar/SideBar'

const page = () => {
  return (
    <div className='flex flex-row'>
      <SideBar />
      
      <div>page</div>
    </div>
  )
}

export default page

