import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export interface IPort {
    id: number;
    portNumber: number;
    protocol: string;
    state: string;
    serviceName?: string;
    hostId: number; 
    extraInfo?: string;
}

export class Port extends Model<IPort> implements IPort {
    id!: number;
    portNumber!: number;
    protocol!: string;
    state!: string;
    serviceName?: string | undefined;
    hostId!: number;
    extraInfo?: string | undefined;
}

Port.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        portNumber: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED
        },
        protocol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hostId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        extraInfo: {
            type: DataTypes.STRING,
            allowNull:true
        }
        
    },
    {
        sequelize,
        tableName: 'ports',
        indexes: [
            {
              unique: true,
              fields: ['hostId', 'portNumber']
            }
          ]
    }
)
