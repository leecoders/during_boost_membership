"use strict";
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      name: DataTypes.STRING,
      images: DataTypes.STRING,
      type: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      bathroom: DataTypes.FLOAT,
      bedroom: DataTypes.INTEGER,
      bed: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      review_count: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    },
    {}
  );
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};
