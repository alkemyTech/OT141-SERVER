/* eslint-disable */


const configNews = [
  {
    categoryId : 1,
    quantity: 5,
    name: 'Ejercicios de salud',
    content: 'Administración de ejercicios para la salud',
  },
  {
    categoryId : 2,
    quantity: 5,
    name: 'Ejercicios',
    content: 'Administración de ejercicios para competencia',
  },
]

async function createNews (configNews) {
  let news = []
  for await (const item of configNews) {
    for (let i=1; i <= item.quantity; i++) {
      news.push({
        name: `${item.name} ${i}`,
        content: `${item.content} ${i}` ,
        categoryId: item.categoryId,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }
  return news
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const news = await createNews(configNews);
    await queryInterface.bulkInsert('News', news, {});
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('News', null, {});
 
  },
};
