import Link from 'next/link'
import SideBar from '../components/SideBar/SideBar'

const page = () => {
  return (
    <div className='flex flex-row'>
      <SideBar />

      <div className='text-5xl font-bold p-11'>
        Pedidos
      </div>
    </div>
  )
}

export default page

