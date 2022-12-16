'use strict';
import { Model }  from 'sequelize';


interface AccountAttributes {
  id: number;
  balance: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Account extends Model<AccountAttributes> {
    id!: number;
    balance!: number;
  }
  Account.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    balance: {
      defaultValue: 100.00,
      type: DataTypes.NUMERIC(20,2),
      allowNull: false,
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Account',
    tableName: 'Accounts'
  });
  return Account;
};