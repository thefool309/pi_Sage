import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Host } from './Host'

export interface IScan {
    id: number;
    date?: string;
    scanResults: object;
    status: string;
    duration: number;
    hostCount: number;
    hostUp: number;
    hostDown: number;
}

export class Scan extends Model<IScan> implements IScan {
    declare id: number;
    declare date: string;
    declare scanResults: object;
    declare status: string;
    declare duration: number;
    declare hostCount: number;
    declare hostUp: number;
    declare hostDown: number;
}

Scan.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        date:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true
        },
        status:{
            type: DataTypes.STRING,
            allowNull: true
        },
        scanResults:{
            type: DataTypes.JSON,
            allowNull: false

        },
        duration:{
            type: DataTypes.FLOAT.UNSIGNED,
            allowNull: false
        },
        hostCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        hostUp:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        hostDown:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'scan-results',
        timestamps: true
    }
)

Scan.hasMany(Host, {
    foreignKey: 'scanId',
    as: 'hosts'
});

Host.belongsTo(Scan, {
    foreignKey: 'scanId',
    as: 'scan'
});