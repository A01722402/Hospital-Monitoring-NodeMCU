-- Database: hospitai

-- DROP DATABASE IF EXISTS hospitai;

CREATE TABLE Cuartos (
    idCuarto SERIAL PRIMARY KEY,
    piso INTEGER,
    ocupado BOOLEAN,
    temperatura FLOAT,
    humo BOOLEAN
);

CREATE TABLE Pacientes (
    idPaciente SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    EstatusPedido VARCHAR(50),
    PulsoBPM INTEGER
);

CREATE TABLE Pedidos (
    idPedido SERIAL PRIMARY KEY,
    pedido VARCHAR(255),
    emergencia BOOLEAN,
    hora TIMESTAMP
);

CREATE TABLE PacientesCuartos (
    idPC SERIAL PRIMARY KEY,
    fk_Pacientes INTEGER REFERENCES Pacientes(idPaciente),
    fk_Cuartos INTEGER REFERENCES Cuartos(idCuarto)
);

CREATE TABLE PacientesPedidos (
    idPP SERIAL PRIMARY KEY,
    fk_Pacientes INTEGER REFERENCES Pacientes(idPaciente),
    fk_Pedidos INTEGER REFERENCES Pedidos(idPedido)
);

CREATE TABLE PacienteCuartoPedido (
    idPCP SERIAL PRIMARY KEY,
    fk_PC INTEGER REFERENCES Pacientes(idPaciente),
    fk_PP INTEGER REFERENCES PacientesPedidos(idPP)
);