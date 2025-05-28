// Incluir as bibliotecas
const express = require("express");
const db = require('./../db/models'); 
const { Op } = require("sequelize");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.put("/cancelar", async (req, res) => {

    // Receber os dados enviados no corpo da requisição
    const data = req.body;

    try {
        // Buscar o paciente que será cancelado
        const pacienteCancelado = await db.pacientCont.findOne({
            attributes: ['id', 'name', 'cell', 'senha', 'posicao', 'status'],
            where: { id: data.id },
            include: [{ model: db.situacoes, attributes: ['nomeSituacao'] }]
        });

        if (!pacienteCancelado) {
            return res.status(404).json({
                error: true,
                message: "Paciente não encontrado!"
            });
        }

        const posicaoCancelada = pacienteCancelado.posicao;

        // Atualizar status do paciente cancelado
        await db.pacientCont.update(
            { status: "2" },
            { where: { id: data.id } }
        );

        // Buscar pacientes afetados
        const pacientesAfetados = await db.pacientCont.findAll({
            attributes: ['id', 'name', 'cell', 'senha', 'posicao', 'status'],
            where: {
                status: "1",
                posicao: { [Op.gt]: posicaoCancelada }
            },
            order: [['posicao', 'ASC']]
        });

        // Atualizar posição e enviar mensagem
        for (const paciente of pacientesAfetados) {
            const novaPosicao = paciente.posicao - 1;

            await db.pacientCont.update(
                { posicao: novaPosicao },
                { where: { id: paciente.id } }
            );

            const payload = {
                id: uuidv4(),
                to: paciente.cell.replace(/\D/g, '') + '@wa.gw.msging.net',
                type: 'application/json',
                content: {
                    type: 'template',
                    template: {
                        namespace: '3ae107a7_3074_41f7_a70a_eddca81e2205',
                        name: 'maia_fila_espera',
                        language: { code: 'pt_BR', policy: 'deterministic' },
                        components: [
                            {
                                type: 'body',
                                parameters: [
                                    { type: 'text', text: paciente.name },
                                    { type: 'text', text: paciente.senha },
                                    { type: 'text', text: String(novaPosicao) }
                                ]
                            }
                        ]
                    }
                }
            };

            try {
                const response = await axios.post(
                    "https://http.msging.net/messages",
                    payload,
                    {
                        headers: {
                            'Authorization': 'Key bmlwbzpBMWFlblB0aEdJUkpIeUd2cjFIbg==',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(`Mensagem enviada para ${paciente.name}:`, response.status, response.data);
            } catch (e) {
                console.error(`Erro ao enviar mensagem para ${paciente.name}:`, e.message);
            }
        }

        // Retornar objeto como resposta
        return res.json({
            error: false,
            message: "Paciente cancelado e mensagens enviadas com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao cancelar paciente:", error);
        return res.status(500).json({
            error: true,
            message: "Erro ao cancelar paciente!",
            detalhe: error.message
        });
    }
});

// Exportar a instrução que está dentro da constante router
module.exports = router;
