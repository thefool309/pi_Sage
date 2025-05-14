import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'
import { toNamespacedPath } from 'path';


// Define a TypeScript interface for type-checking.
export interface IUser {
  //the id must be optional in the interface 
  // this ensures that the interface can be initialized without the id
  // this helps when creating a database instance of User
  // or anything that implements it
    id?: number;
    name: string;
    email?: string;
}

// Extend Sequelize's Model class.
export class User extends Model<IUser> implements IUser {
    declare id: number;       // The "!" tells TypeScript that this value will be set.
    declare name: string;
    declare email: string;    // a "?" tells TypeScript that the value could be set but doesnt require it
}

// Initialize the model and define its schema.
User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED, // An unsigned integer.
        autoIncrement: true,                // Automatically increments.
        primaryKey: true,  
                       // Primary key of the table.
      },
      name: {
        type: new DataTypes.STRING(128),    // String with a max length of 128.
        allowNull: false,                   // Cannot be null.
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: true,
        unique: true,                       // Must be unique.
      },
    },
    {
      initialAutoIncrement: "100",
      tableName: 'users',   // Name of the table in the database.
      sequelize,            // Passing the Sequelize instance.
    }
  );
