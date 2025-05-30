import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { Port } from "./Port";

export interface IHost {
  id?: number;
  scanId: number;
  //status members
  status: string;
  reason: string;
  reason_ttl: number;
  //address members
  addr?: string;
  addr_type?: string;
  mac_addr?: string;
  vendor?: string;
}

export class Host extends Model<IHost> implements IHost {
  declare id: number;
  declare scanId: number;
  //status members
  declare status: string;
  declare reason: string;
  declare reason_ttl: number;
  //address members
  declare addr?: string;
  declare addr_type?: string;
  declare mac_addr?: string;
  declare vendor?: string;
}

Host.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    scanId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // status members
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason_ttl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // address members
    addr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addr_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mac_addr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Hosts",
    timestamps: true,
    initialAutoIncrement: "300",
  }
);

Host.hasMany(Port, {
  foreignKey: "host_id",
  as: "ports",
});

Port.belongsTo(Host, {
  foreignKey: "host_id",
  as: "host",
});
