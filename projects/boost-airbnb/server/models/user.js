"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: DataTypes.STRING,
      userPassword: DataTypes.STRING,
      userName: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // 모델 전부 읽은 뒤에 실행(관계 설정하는 부분. 안하면 조인 안됨 마이그레이션에서도 references 해줘야되고)
    // associations can be defined here
  };
  return User;
};
