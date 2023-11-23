import React from 'react';

const TablaPacientes = ({ data } : { data:any }) => {



  return (
    <table className="w-4/5">
      <thead>
        <tr className="bg-red-900 text-white font-normal">
          <th className='w-1/5'>Nombre</th>
          <th className='w-1/5'>Cuarto</th>
          <th className='w-1/5'>Estatus de Pedido</th>
          <th className='w-1/5'>Temperatura</th>
          <th className='w-1/5'>Pulso</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item:any, index: number) => (
          <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-200"} key={item.Nombre}>
            <td className="pl-3">{item.Nombre}</td>
            <td className="pl-3">{item.Cuarto}</td>
            <td className="pl-3">{item.Estatus ? "Pedidos" : "No hay pedidos"}</td>
            <td className="pl-3 text-center ">{item.Temperatura}</td>
            <td className="pl-3">{item.PulsoBPM}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );  
};

export default TablaPacientes;

