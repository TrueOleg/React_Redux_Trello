module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define('tasks', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      content: {
        type: DataTypes.TEXT,
      },
      board_id: {
        type: DataTypes.BIGINT,
      },
      status: {
        type: DataTypes.TEXT,
      },
      position: {
        type: DataTypes.BIGINT,
      },
    });
  
    Tasks.associate = function (models) {
      Tasks.belongsTo(models.Boards, {
        foreignKey: 'board_id',
      });
    };
  
    return Tasks;
  };