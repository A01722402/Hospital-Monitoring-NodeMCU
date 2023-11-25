'use client'

import { useEffect, useState } from 'react'

const TablaPacientes = () => {
  const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/pacienteslista');
            const allData = await res.json();

            setData(allData);

        } catch (err) {
            console.error('Error fetching data', err);
        }
    }

    useEffect(() => {
        fetchData()

        const intervalID = setInterval(fetchData, 10000);

        return () => clearInterval(intervalID);
    }, []);

  return (
    <div className='w-full'>
      <div className='w-[80%] mx-auto text-black'>
        <div className='w-full'>
          <div className='flex justify-center items-centers'>
            <input
              type='text'
              placeholder="Buscar por nombre"
              className='w-full font-primary text-md rounded-lg
              px-4 py-3 text-black my-4 border border-gra bg-gray-50
              shadow-lg outline-none'
            />
          </div>
          <div>
            <table className="w-full overflow-auto">
              <thead>
                <tr className="bg-red-900 text-white font-normal">
                  <th className='w-1/6'>ID</th>
                  <th className='w-1/6'>Nombre</th>
                  <th className='w-1/6'>Cuarto</th>
                  <th className='w-1/6'>Estatus de Pedido</th>
                  <th className='w-1/6'>Temperatura</th>
                  <th className='w-1/6'>Pulso</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item:any, index: number) => (
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-200" } key={item.Nombre} >
                    <td className="text-center border">{item.Id}</td>
                    <td className="text-center border">{item.Nombre}</td>
                    <td className="text-center border">{item.Cuarto}</td>
                    <td className="text-center border">{item.Estatus=== false ? "Completado" : "Pendiente"}</td>
                    <td className="text-center border">{item.Temperatura}</td>
                    <td className="text-center border">{item.PulsoBPM}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );  
};

export default TablaPacientes;

