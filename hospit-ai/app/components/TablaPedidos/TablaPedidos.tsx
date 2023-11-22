

const TablaPedidos = ({data, filt} : {data:any, filt:number}) => {

    if (filt === 1) {
        data = data.filter((item:any) => {
            return item.emergencia === filt
        })
    } else {
        data = data.filter((item:any) => {
            return item.emergencia === filt
        })
    }

    for(let i = 0; i < data.length; i++) {
        data[i].hora = data[i].hora.slice(11, 16)
    }

  return (
    <table>
        <thead>
            <tr className="bg-red-900 text-white font-normal">
                <th></th>
                <th className='text-left pl-3' style={{width: "10%"}}>No. Cuarto</th>
                <th className='text-left pl-3' style={{width: "20%"}}>Nombre</th>
                <th style={{width: "60%"}}>Pedido</th>
                <th style={{width: "10%"}}>Hora</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item:any, index: number)  => (
                <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-200"} key={item.pedidoID}>
                    <td> <input type="checkbox" ></input>   </td>
                    <td className="pl-3">{item.numCuarto}</td>
                    <td className="pl-3">{item.pacienteNombre}</td>
                    <td className="pl-3">{item.pedido}</td>
                    <td className="text-center">{item.hora}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TablaPedidos