import React from 'react';

const TablaPacientes = ({ data } : { data:any }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 rounded-sm">
      <thead>
        <tr>
          <th>UserId</th>
          <th>Id</th>
          <th>Title</th>
          {/* <th>Completed</th> */}
          {/* <th>Pulse</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((item:any) => (
          <tr key={item.id}>
            <td>{item.userId}</td>
            <td>{item.id}</td>
            <td>{item.title}</td>
            {/* <td>{item.completed}</td> */}
            {/* <td>{item.pulse}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPacientes;

