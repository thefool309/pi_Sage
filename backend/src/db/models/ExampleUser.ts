import { DataTypes, Model } from "sequelize";
import { sequelize } from '../database'


// Define a TypeScript interface for type-checking.
export interface IUser {
    id?: number;
    name: string;
    email: string;
}

