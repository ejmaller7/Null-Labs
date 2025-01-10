import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
    },
  },
});

// User model
const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
      allowNull: false,
    },
  }, );

export { sequelize, User };