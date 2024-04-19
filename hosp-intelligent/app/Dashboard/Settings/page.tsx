import SideBar from "@/app/components/SideBar/SideBar"
import TablaPacientes from "@/app/components/TablaPacientes/TablaPacientes"
import TopBar from '@/app/components/TopBar/TopBar'

const page = async () => {
  return (
    <div className='flex flex-col h-screen'>
      <TopBar />
      <hr className='border-2 border-black' />
      <div className='flex flex-row'>
        <SideBar />
        <div className='flex flex-col flex-grow'>
        <div className="flex flex-col flex-grow">
          <div className='text-5xl py-9 pl-12 bg-red-500 text-white'>
            Ajustes
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page