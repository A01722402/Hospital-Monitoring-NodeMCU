import Link from 'next/link'
import SideBar from '../components/SideBar/SideBar'
import TablaPedidos from '../components/TablaPedidos/TablaPedidos'

const page = async () => {
  return (
    <div className='flex flex-row'>
      <SideBar />

      <div className='flex flex-col flex-grow'>
        <div className='text-6xl py-7 pl-7 bg-red-900 text-white'>
            Pedidos
        </div>

        <div className='flex flex-col flex-grow p-11 bg-white'>

          <div className='flex flex-col pb-36'>
            <div className='pl-12 text-3xl font-bold pb-3'> 
            🚨 Emergencia
            </div>
  
            <TablaPedidos 
            filt={1} />
            
          </div>


          <div className='flex flex-col'>
            <div className='pl-12 text-3xl font-bold pb-3'>
              No Emergencia
            </div>

            <TablaPedidos 
            filt={0}
            />

          </div>
        </div>
      </div>

    </div>
  )
}

export default page

