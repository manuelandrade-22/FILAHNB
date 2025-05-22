const express = require("express");
const db = require('../db/models'); 
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post("/cadastrar", async (req, res) => {
    try {
        const data = req.body;

        // Cadastrar paciente
        const novoPaciente = await db.pacientCont.create(data);

        // Buscar todos os pacientes ativos para atualizar a posição
        const pacientes = await db.pacientCont.findAll({
            attributes: ['id', 'name', 'cell', 'senha', 'posicao', 'status'],
            order: [['id', 'ASC']],
            where: { status: "1" }
        });

        // Atualiza posição no banco e localmente
        await Promise.all(
            pacientes.map((paciente, index) => {
                const novaPosicao = index + 1;
                paciente.posicao = novaPosicao;
                return db.pacientCont.update(
                    { posicao: novaPosicao },
                    { where: { id: paciente.id } }
                );
            })
        );

        // Encontrar a posição do novo paciente
        const pacienteAtualizado = pacientes.find(p => p.id === novoPaciente.id);

        if (!pacienteAtualizado) {
            return res.status(500).json({ error: true, message: "Erro ao localizar paciente na fila." });
        }

        const nome = pacienteAtualizado.name;
        const senha = pacienteAtualizado.senha;
        const posicao = pacienteAtualizado.posicao;
        const cell = pacienteAtualizado.cell;

        // Montar o payload
        const payload = {
            id: uuidv4(),
            to: cell + '@wa.gw.msging.net',
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
                                { type: 'text', text: nome },
                                { type: 'text', text: senha },
                                { type: 'text', text: String(posicao) }
                            ]
                        }
                    ]
                }
            }
        };

        // Enviar mensagem via Blip
        try {
            const response = await axios.post("https://http.msging.net/messages", payload, {
                headers: {
                    'Authorization': 'Key bmlwbzpBMWFlblB0aEdJUkpIeUd2cjFIbg==',
                    'Content-Type': 'application/json'
                }
            });

            console.log(`Mensagem enviada para ${nome}:`, response.data);
        } catch (e) {
            console.error(`Erro ao enviar mensagem para ${nome}:`, e.message);
        }

        return res.json({
            error: false,
            message: "Usuário cadastrado com sucesso e mensagem enviada!",
            paciente: pacienteAtualizado
        });

    } catch (error) {
        console.error("Erro ao cadastrar paciente:", error);
        return res.status(500).json({
            error: true,
            message: "Erro: Usuário não cadastrado com sucesso!"
        });
    }
});

module.exports = router;