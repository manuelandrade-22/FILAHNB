// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require('express');

// Chamar a função express
const app = express()

// Testar conexão com banco de dados
const db = require("./db/models");


// Incluir as CONTROLLERS
const listar = require("./controlers/listar");
const atender = require("./controlers/atender");



// Criar as rotas
app.use('/listar', listar);
app.use('/atender', atender);

app.listen(8080, ()=>{
    console.log("Servidor iniciado na porta: http://localhost:8080")
})