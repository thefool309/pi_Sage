import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { Host } from "./Host";

export interface IScan {
  id?: number;
  date?: string;
  scan_results: object;
  duration: number;
  summary?: string;
  exit_success: string;
  host_count: number;
  host_up: number;
  host_down: number;
}

export class Scan extends Model<IScan> implements IScan {
  declare id: number;
  declare date: string;
  declare scan_results: object;
  declare duration: number;
  declare summary: string;
  declare exit_success: string;
  declare host_count: number;
  declare host_up: number;
  declare host_down: number;
}

Scan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    scan_results: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    duration: {
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: false,
    },
    exit_success: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    host_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    host_up: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    host_down: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "scan-results",
    timestamps: true,
  }
);

Scan.hasMany(Host, {
  foreignKey: "scanId",
  as: "hosts",
});

Host.belongsTo(Scan, {
  foreignKey: "scanId",
  as: "scan",
});
