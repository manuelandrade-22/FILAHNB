// Normatizar o código, ajuda evitar gambiarras 
'use strict';

/** @type {import('sequelize-cli').Migration} */

// Exportar o objeto como modulo
// Como module.exports é possível exportar funções, objetos, variáveis, etc., para serem usados em outras partes do projeto.
module.exports = {

  // Cadastrar o registro na tabela "HomesTops"
  async up (queryInterface) {
    return queryInterface.bulkInsert('pacientConts', [
      {
       name: 'pendente01',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '1',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
       name: 'pendente02',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '1',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
       name: 'pendente03',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '1',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
       name: 'cancelado01',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '2',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
       name: 'cancelado02',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '3',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
       name: 'cancelado03',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '2',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
       name: 'atendido01',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '1',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	{
       name: 'atendido02',
   	 cell: '123456789',
   	 senha: 'abc123',
   	 posicao: '1',
  	 status: '1',
       createdAt: new Date(),
       updatedAt: new Date(),
      },
	
    ])
  },

  // Limpar os registros da tabela "HomesTops"
  async down (queryInterface) {
    await queryInterface.bulkDelete('pacientConts', null, {});
  }
};