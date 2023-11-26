'use client'

import { useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';

const TablaPacientes = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/pacienteslista?search=${searchQuery}');
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
    }, [searchQuery]);

    const handleSearch = (query : any) => {
        setSearchQuery(query)
    }

  return (
    <div className='w-full'>
      <div className='w-[80%] mx-auto text-black'>
        <div className='w-full'>
          <div className='flex justify-center items-centers'>
            <SearchBar onSearch={handleSearch}/>
          </div>
          <div>
            <table className="w-full overflow-auto">
              <thead>
                <tr className="bg-red-900 text-white font-normal">
                  <th style={{width: "10%"}}>Cuarto</th>
                  <th style={{width: "35%"}}>Nombre</th>
                  <th style={{width: "30%"}}>Estatus de Pedido</th>
                  <th style={{width: "15%"}}>Temperatura</th>
                  <th style={{width: "10%"}}>Pulso</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item:any, index: number) => (
                  (item.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) && (
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-200" } key={item.Cuarto} >
                    <td className="text-center border">{item.Cuarto}</td>
                    <td className="text-center border">{item.Nombre}</td>
                    <td className="text-center border">{item.EstatusPedido === 0 ? "Sin Pedido" : "Pendiente"}</td>
                    <td className="text-center border">{item.Temperatura}° C</td>
                    <td className="text-center border">{item.Pulso}</td>
                  </tr>
                  ))
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

