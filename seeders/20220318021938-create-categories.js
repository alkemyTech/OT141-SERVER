/* eslint-disable */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Salud',
        description: 'Aqui se habla de salud',
        image: 'https://www.elmundo.es/medio/imagenes/2019/11/12/1574005908_5a1b8f9b-b9b9-4f7f-a8b6-f8f9b8f9b8f9_1574005908_noticia_normal.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deporte',
        description: 'Aqui se habla de deporte',
        image: 'https://www.elmundo.es/medio/imagenes/2019/11/12/1574005908_5a1b8f9b-b9b9-4f7f-a8b6-f8f9b8f9b8f9_1574005908_noticia_normal.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
