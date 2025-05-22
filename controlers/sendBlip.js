const express = require("express");
const db = require('../db/models'); 
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get("/send-blip", async (req, res) => {
  try {
      const pacientes = await db.pacientCont.findAll({
          attributes: ['id', 'name', 'cell', 'senha', 'posicao', 'status'],
          order: [['id', 'ASC']],
          where: { status: "1" }
      });

      // Atualiza posição no banco e localmente
      await Promise.all(
          pacientes.map((paciente, index) => {
              const novaPosicao = index + 1;
              paciente.posicao = novaPosicao;  // Atualiza local
              return db.pacientCont.update(
                  { posicao: novaPosicao },
                  { where: { id: paciente.id } }
              );
          })
      );

      // Garante a ordem
      pacientes.sort((a, b) => a.posicao - b.posicao);

      for (const paciente of pacientes) {
          const nome = paciente.name;
          const senha = paciente.senha;
          const posicao = paciente.posicao;

          const payload = {
              id: uuidv4(),
              to: paciente.cell + '@wa.gw.msging.net',
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
      }

      res.json({ mensagem: "Mensagens enviadas com sucesso!" });

  } catch (error) {
      console.error("Erro ao processar:", error);
      res.status(500).json({ erro: "Erro ao atualizar posições ou enviar dados." });
  }
});

module.exports = router;
