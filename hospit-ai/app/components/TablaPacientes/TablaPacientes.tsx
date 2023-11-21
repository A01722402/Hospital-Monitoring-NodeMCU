import React from 'react';

const TablaPacientes = ({ data } : { data:any }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th>Name</th>
          <th>Dorm</th>
          <th>Status</th>
          <th>Temperature</th>
          <th>Pulse</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item:any) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.dorm}</td>
            <td>{item.status}</td>
            <td>{item.temperature}</td>
            <td>{item.pulse}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPacientes;

