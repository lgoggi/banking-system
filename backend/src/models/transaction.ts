'use strict';
import { Model }  from 'sequelize';

interface TransactionAttributes {
  id: number;
  value: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Transaction extends Model<TransactionAttributes> {
    id!: number;
    value!: number;
  }
  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    value: {
      type: DataTypes.NUMERIC(20,2),
      allowNull: false,
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions'
  });
  return Transaction;
};