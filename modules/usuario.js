// Importar dependências necessárias
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/banco'); // Ajuste o caminho conforme a estrutura do seu projeto

// Definir o modelo de Usuário
class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Adicione outros campos conforme necessário
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios', // Nome da tabela no banco de dados
  timestamps: true, // Adiciona campos `createdAt` e `updatedAt`
});

module.exports = Usuario;
