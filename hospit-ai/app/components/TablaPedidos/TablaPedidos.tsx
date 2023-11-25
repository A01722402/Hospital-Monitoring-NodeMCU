'use client'

import { useEffect, useState } from 'react'
import CheckBox from "./CheckBox/CheckBox"

const TablaPedidos = ({filt} : {filt:number}) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/pedidostabla');
            const allData = await res.json();

            const filteredData = allData.filter((item:any) => {
                item.hora = item.hora.slice(11, 16)
                return item.emergencia === filt
            })

            setData(filteredData);

        } catch (err) {
            console.error('Error fetching data', err);
        }
    }

    useEffect(() => {
        fetchData()

        const intervalID = setInterval(fetchData, 10000);

        return () => clearInterval(intervalID);
    }, [filt]);

    const handleCheckBoxClick = async (pedidoID: number) => {
        try {
            await fetch(`http://localhost:3001/api/deletePedido/${pedidoID}`, {
                method: 'DELETE',
            });
            fetchData();
        } catch (err) {
            console.error('Error fetching data', err);
        }
    }

  return (
    <table>
        <thead>
            <tr className="bg-red-900 text-white font-normal text-center">
                <th></th>
                <th style={{width: "10%"}}>No. Cuarto</th>
                <th style={{width: "20%"}}>Nombre</th>
                <th style={{width: "60%"}}>Pedido</th>
                <th style={{width: "10%"}}>Hora</th>
            </tr>
        </thead>
        <tbody className='text-center'>
            {data.map((item:any, index: number)  => (
                <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-200"} key={item.pedidoID}>
                    <td className='border'> <CheckBox onCheck={() => handleCheckBoxClick(item.pedidoID)} />   </td>
                    <td className='border'>{item.numCuarto}</td>
                    <td className='border'>{item.pacienteNombre}</td>
                    <td className='border'>{item.pedido}</td>
                    <td className='border'>{item.hora}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TablaPedidos