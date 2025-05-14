import {Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Port } from './Port';

export interface IHost {
    id?: number;
    ip: string;
    status: string;
    ports: number[];
    scanId?: number;
}

export class Host extends Model<IHost> implements IHost {
    id!: number;
    ip!: string;
    status!: string;
    ports!: number[];
    scanId!: number;
}

Host.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
            
        },
        ip: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(32), 
            allowNull: false
        },
        ports: {
            type: DataTypes.JSON,
            allowNull: false
        },
        scanId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'Hosts',
        timestamps: true
    }
);

Host.hasMany(Port, {
    foreignKey: 'hostId',
    as: 'ports'
});

Port.belongsTo(Host, {
    foreignKey: 'hostId',
    as: 'host'
});