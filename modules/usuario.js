const Usuario = sequelize.define("Usuario", {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  nome: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // O e-mail deve ser único no banco
      validate: {
          isEmail: true // Validação para garantir que o formato é um e-mail válido
      }
  },
  senha: {
      type: DataTypes.STRING,
      allowNull: false
  },
  data_nascimento: {
      type: DataTypes.DATE,
      allowNull: true // Opcional
  },
  tipo_usuario: {
      type: DataTypes.ENUM("Aluno", "Bibliotecário", "Administrador"),
      allowNull: false,
      defaultValue: "Aluno" // Padrão será "Aluno"
  },
  data_cadastro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Salva a data do cadastro
  }
}, {
  timestamps: false
});

