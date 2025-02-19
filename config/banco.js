const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'biblioteca',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || "Andrade04@biel",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: 'mysql',
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

module.exports = sequelize;
