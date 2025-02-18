const {Sequelize} = require("sequelize");
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

sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados!!'))
    .catch((err) => console.error('Erro ao se conectar ao banco:', err))
    
module.exports = sequelize;