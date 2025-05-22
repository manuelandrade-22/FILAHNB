// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require('express');

// Chamar a função express
const app = express()

// Testar conexão com banco de dados
const db = require("./db/models");


// Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());

// Incluir as CONTROLLERS
const listar = require("./controlers/listar");
const visualizar = require("./controlers/visualizar");
const cadastrar = require("./controlers/cadastrar");
const atender = require("./controlers/atender");
const sendBlip = require("./controlers/sendBlip");
const cancelar = require("./controlers/cancelar");




// Criar as rotas
app.use('/', listar);
app.use('/', visualizar);
app.use('/', cadastrar);
app.use('/', atender);
app.use('/', sendBlip);
app.use('/', cancelar);


app.listen(8080, ()=>{
    console.log("Servidor iniciado na porta: http://localhost:8080")
})