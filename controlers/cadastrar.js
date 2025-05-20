// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express

// importar a variavel de banco de dados
const db = require('../db/models'); 
const { Model} = require("sequelize");



const router = express.Router();

// Criar a rota cadastar com método put: http://localhost:8080/listar
router.post("/cadastrar", async (req, res) => {

    // Receber os dados enviados no corpo da requisição
    var data = req.body;

    // Salvar no banco de dados
    await db.pacientCont.create(data).then((datapacienr) => {

        // Retornar objeto como resposta
        return res.json({
            error: false,
            message: "Usuário cadastrado com sucesso!",
            datapacienr
        });
    }).catch(() => {
        // Retornar objeto como resposta
        return res.status(400).json({
            error: true,
            message: "Erro: Usuário não cadastrado com sucesso!"
        });
    });
});

// Exportar a instrução que está dentro da constante router 
module.exports = router;