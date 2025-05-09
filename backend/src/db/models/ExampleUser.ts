import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'
import { toNamespacedPath } from 'path';


// Define a TypeScript interface for type-checking.
export interface IUser {
    id: number;
    name: string;
    email: string;
}

// Extend Sequelize's Model class.
export class User extends Model<IUser> implements IUser {
    public id!: number;       // The "!" tells TypeScript that this value will be set.
    public name!: string;
    public email!: string;    // a "?" tells TypeScript that the value could be set but doesnt require it
  }

// Initialize the model and define its schema.
User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED, // An unsigned integer.
        autoIncrement: true,                // Automatically increments.
        primaryKey: true,                   // Primary key of the table.
      },
      name: {
        type: new DataTypes.STRING(128),    // String with a max length of 128.
        allowNull: false,                   // Cannot be null.
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,                       // Must be unique.
      },
    },
    {
      tableName: 'users',   // Name of the table in the database.
      sequelize,            // Passing the Sequelize instance.
    }
  );
