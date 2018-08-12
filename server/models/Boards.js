module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('boards', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    secret: {
      type: DataTypes.TEXT
    }
  });

  Boards.associate = function (models) {
    models.Boards.hasMany(models.Tasks, {
      foreignKey: 'id',
    });

    models.Boards.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
    
  };
  

  return Boards;
};