
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

// API route to get Pacientes from MySQL database
app.get('/api/pacientes', async (req, res) => {
    try {
        const [rows, fields] = await pool.promise().query('SELECT * FROM Pacientes');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// API route to get Cuartos from MySQL database
app.get('/api/cuartos', async (req, res) => {
    try {
        const [rows, fields] = await pool.promise().query('SELECT * FROM Cuartos');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// API route to get Pedidos from MySQL database
app.get('/api/pedidos', async (req, res) => {
    try {
        const [rows, fields] = await pool.promise().query('SELECT * FROM Pedidos');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
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
        const [rows, fields] = await pool.promise().query('SELECT Pacientes.idPaciente AS ID, Pacientes.nombre AS Nombre, Cuartos.idCuarto AS Cuarto, Pacientes.EstatusPedido AS Estatus, Cuartos.temperatura As Temperatura, Pacientes.PulsoBPM FROM PacienteCuartoPedido LEFT JOIN PacientesCuartos ON PacienteCuartoPedido.fk_PC = PacientesCuartos.idPC LEFT JOIN PacientesPedidos ON PacienteCuartoPedido.fk_PP = PacientesPedidos.idPP LEFT JOIN Pacientes ON PacientesCuartos.fk_Pacientes  = Pacientes.idPaciente LEFT JOIN Cuartos ON PacientesCuartos.fk_Cuartos  = idCuarto LEFT JOIN Pedidos ON PacientesPedidos.fk_Pedidos = idPedido');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// Starts the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
