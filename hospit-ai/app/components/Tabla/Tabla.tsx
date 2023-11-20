

const Tabla = ({data} : {data:any}) => {
  return (
    <table>
        <thead>
            <tr>
                <th>No. Cuarto</th>
                <th>Nombre</th>
                <th>Pedido</th>
                <th>Hora</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item:any)  => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.order}</td>
                    <td>{item.time}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Tabla