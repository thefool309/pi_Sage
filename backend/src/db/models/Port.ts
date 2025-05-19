import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface IPort {
  id?: number;
  host_id: number;
  portNumber: number;
  protocol: string;
  //state members
  state: string;
  reason: string;
  reason_ttl: number;
  //service members
  service_name?: string;
  service_product?: string;
  service_version?: string;
  service_method?: string;
  cpe?: string;
}

export class Port extends Model<IPort> implements IPort {
  declare id: number;
  declare host_id: number;
  // top level members
  // inside an object named '$' inside the port object in the json
  declare portNumber: number;
  declare protocol: string;
  //state members
  declare state: string;
  declare reason: string;
  declare reason_ttl: number;
  //service members
  declare service_name: string;
  declare service_product?: string;
  declare service_version?: string;
  declare service_method?: string;
  declare cpe?: string;
}

Port.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    host_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    portNumber: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    protocol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason_ttl: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_product: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cpe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "ports",
    indexes: [
      {
        unique: true,
        fields: ["hostId", "portNumber"],
      },
    ],
  }
);
