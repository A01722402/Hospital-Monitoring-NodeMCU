import Link from 'next/link'
import SideBar from '../components/SideBar/SideBar'
import Tabla from '../components/Tabla/Tabla'

const data = [
  {id: 1, name: 'Juan', order: 'Emergencia', time: '12:00'},
];

const page = () => {
  return (
    <div className='flex flex-row'>
      <SideBar />

      <div className='flex flex-col flex-grow p-11'>
        <div className='text-5xl font-bold pb-11'>
          Pedidos
        </div>

        <div className='flex flex-col'>
          <div>
            Emergencia
          </div>

          <Tabla 
          data={data}
          />
        </div>


        <div className='flex flex-col'>
          <div>
            No Emergencia
          </div>

          <Tabla 
          data={data}
          />
        </div>
      </div>
    </div>
  )
}

export default page

