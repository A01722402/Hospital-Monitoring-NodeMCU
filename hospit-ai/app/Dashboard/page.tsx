import Link from 'next/link'
import SideBar from '../components/SideBar/SideBar'
import TablaPedidos from '../components/TablaPedidos/TablaPedidos'

const page = async () => {
  return (
    <div className='flex flex-row'>
      <SideBar />

      <div className='flex flex-col flex-grow'>
        <div className='text-5xl py-9 pl-12 bg-red-800 text-white'>
            Pedidos
        </div>

        <div className='flex flex-col flex-grow pl-11 pt-16 bg-white'>

          <div className='flex flex-col pb-36'>
            <div className='pl-12 text-3xl font-bold pb-3'> 
            🚨 Emergencia
            </div>
            
            <div className='flex items-center justify-center'>
              <TablaPedidos 
              filt={1} />
            </div>
            
          </div>


          <div className='flex flex-col'>
            <div className='pl-12 text-3xl font-bold pb-3'>
              No Emergencia
            </div>

            <div className='flex items-center justify-center'>
            <TablaPedidos 
            filt={0} />
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default page

