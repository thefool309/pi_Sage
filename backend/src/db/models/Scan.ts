import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Host } from './Host'

export interface IScan {
    id: number;
    date?: string;
    scanResults: object;
    status?: 'pending' | 'in-progress' | 'completed' | 'failed';
    duration: number;
    hostCount: number;
}

export class Scan extends Model<IScan> implements IScan {
    public id!: number;
    public date?: string;
    public scanResults!: object;
    public status?: 'pending' | 'in-progress' | 'completed' | 'failed';
    public duration!: number;
    public hostCount!: number;
}

Scan.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        date:{
            type: DataTypes.STRING,
            allowNull: true
        },
        scanResults:{
            type: DataTypes.JSON,
            allowNull: false

        },
        duration:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false

        },
        hostCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        }
    },
    {
        sequelize,
        tableName: 'scan-results'
    }
)

Scan.hasMany(Host, {
    foreignKey: 'scanId',
    as: 'hosts',
});

Host.belongsTo(Scan, {
    foreignKey: 'scanId',
    as: 'scan'
});