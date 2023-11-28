
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


// Handles the HTTP requests and responsees
const app = express();

// Enable CORS for all routes
app.use(cors());

// Sends the info to the port 3001 or if the port is especified by the environment sends it there
const PORT = process.env.PORT || 3001;

// MySQL connection pool
// A pool is a cache of database connections maintained so that the connections can be reused when future requests to the database are required
const pool = mysql.createPool({
    host: 'IP ADRESS OF THE SERVER',
    user: 'USER OF THE DATABASE',
    password: "PASSWORD OF THE DATABASE",
    database: 'NAME OF THE DATABASE',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.get('/api/pedidostabla', async (req, res) => {
    try {
        const [rows, fields] = await pool.promise().query('SELECT Pacientes.nombre AS pacienteNombre, Cuartos.idCuarto AS numCuarto, Pedidos.emergencia AS emergencia, Pedidos.hora AS hora, Pedidos.pedido AS pedido, Pedidos.idPedido  AS pedidoID, Pacientes.idPaciente AS pacienteID FROM PacienteCuartoPedido LEFT JOIN PacientesCuartos ON PacienteCuartoPedido.fk_PC = PacientesCuartos.idPC LEFT JOIN PacientesPedidos ON PacienteCuartoPedido.fk_PP = PacientesPedidos.idPP LEFT JOIN Pacientes ON PacientesCuartos.fk_Pacientes  = Pacientes.idPaciente LEFT JOIN Cuartos ON PacientesCuartos.fk_Cuartos  = idCuarto LEFT JOIN Pedidos ON PacientesPedidos.fk_Pedidos = idPedido');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});


app.get('/api/pacienteslista', async (req, res) => {
    try {
        const [rows, fields] = await pool.promise().query('SELECT Pacientes.idPaciente AS ID, Pacientes.nombre AS Nombre, Pacientes.EstatusPedido AS EstatusPedido, Pacientes.PulsoBPM AS Pulso, Cuartos.idCuarto AS Cuarto, Cuartos.temperatura AS Temperatura, Cuartos.humo AS Humo FROM PacientesCuartos LEFT JOIN Pacientes ON PacientesCuartos.fk_Pacientes = idPaciente LEFT JOIN Cuartos ON PacientesCuartos.fk_Cuartos  = idCuarto WHERE Cuartos.ocupado != 0;');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

app.delete('/api/deletePedido/:pedidoID', async (req, res) => {
    const pedidoID = req.params.pedidoID;

    try {
        await pool.promise().query('DELETE FROM Pedidos WHERE idPedido = ?', [pedidoID]);
        
        res.status(200).send('Pedido deleted');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// Starts the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});