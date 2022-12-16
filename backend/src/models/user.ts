'use strict';
import { Model} from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  token?: string;
}



module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> {
    id!: number;
    username!: string;
    password!: string;
    token?: string;
    
  }
  User.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING  
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};