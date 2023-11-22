import Link from 'next/link'
import SideBar from '../components/SideBar/SideBar'

import TablaPedidos from '../components/TablaPedidos/TablaPedidos'



interface Data {
  pacienteNombre: string,
  numCuarto: number,
  emergencia: number,
  hora: string,
  pedido: string,
  pedidoID: number,
  pacienteID: number
}

const page = async () => {
  const res = await fetch('http://localhost:3001/api/pedidostabla', {next: {revalidate: 10}});
  const data: Data[] = await res.json();


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
            data={data}
            filt={1} />
            
          </div>


          <div className='flex flex-col'>
            <div className='pl-12 text-3xl font-bold pb-3'>
              No Emergencia
            </div>

            <TablaPedidos 
            data={data}
            filt={0}
            />

          </div>
        </div>
      </div>

    </div>
  )
}

export default page

