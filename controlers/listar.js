// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express

// importar a variavel de banco de dados
const db = require('./../db/models'); 
const { Model} = require("sequelize");



const router = express.Router();

// Criar a rota listar com método get: http://localhost:8080/listar

// 
router.get("/listar", async (req, res) => {

   

    // Recuperar os registros do banco de dados
    const lista = await db.pacientCont.findAll({

        // Indicar quais colunas recuperar
        attributes: ['id', 'name', 'cell', 'senha', 'posicao','status'],
        
        // Buscar dados na tabela secundaria
        include: [{ model:db.situacoes , attributes: ['nomeSituacao'] }],


        // Ordenar os registros pela coluna id na forma decrescente
        order: [['id', 'ASC']],

        where:{
            status:"1"
        }
            
        
    });

    if (lista) {
        return res.json({
            error: false,
            lista
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