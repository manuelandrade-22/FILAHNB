// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express

// importar a variavel de banco de dados
const db = require('./../db/models'); 
const { Model} = require("sequelize");



const router = express.Router();


    router.put("/atender", async (req, res) => {

        // Receber os dados enviados no corpo da requisição
        const data = req.body;

        console.log(data.id)
    
        // Editar no banco de dados
        await db.pacientCont.update(data, { where: { id: data.id } })
            .then(() => {

                // Retornar objeto como resposta
                return res.json({
                    error: false,
                    message: "Usuário atendido com sucesso!"
                });
            }).catch(() => {
                // Retornar objeto como resposta
                return res.status(400).json({
                    error: true,
                    message: "Erro: Usuário não atendido com sucesso!"
                });
            });
    
    });
    



// Exportar a instrução que está dentro da constante router 
module.exports = router;