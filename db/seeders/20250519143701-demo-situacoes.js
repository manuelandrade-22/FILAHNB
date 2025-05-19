'use strict';

/** @type {import('sequelize-cli').Migration} */

// Exportar o objeto como modulo
// Como module.exports é possível exportar funções, objetos, variáveis, etc., para serem usados em outras partes do projeto.
module.exports = {

  // Cadastrar o registro na tabela "HomesTops"
  async up (queryInterface) {
    return queryInterface.bulkInsert('situacoes', [
      {
      nomeSituacao: 'pendente',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
      nomeSituacao: 'cancelado',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
      nomeSituacao: 'atendido',
       createdAt: new Date(),
       updatedAt: new Date(),
      }
	
	
    ])
  },

  // Limpar os registros da tabela "situacao"
  async down (queryInterface) {
    await queryInterface.bulkDelete('situacoes', null, {});
  }
};
