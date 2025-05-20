// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express

// importar a variavel de banco de dados
const db = require('../db/models'); 

const { Model } = require("sequelize");



const router = express.Router();

// Criar a rota listar com método get: http://localhost:8080/listar

// 
router.get("/visualizar/:id", async (req, res) => {

    // Receber o parâmetro enviado na URL
    // http://localhost:8080/users/7
     const { id } = req.params;


    // Recuperar os registros do banco de dados
    const visualizar = await db.pacientCont.findOne({

        // Indicar quais colunas recuperar
        attributes: ['id', 'name', 'cell', 'senha', 'posicao','status'],

       // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
        where: { id },
        
        // Buscar dados na tabela secundaria
        include: [{ model:db.situacoes , attributes: ['nomeSituacao'] }]

    
    });

    if (visualizar) {
        return res.json({
            error: false,
            visualizar
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Erro: Nenhum registro sobre empresa encontrado!"
        });
    }

    
});

// Exportar a instrução que está dentro da constante router 
module.exports = router;