import connection from "../config/db.js";
import Sequelize from "sequelize";
import Reservation from "./reservations.js";

const Building = connection.define(
    "building",
    {
        building_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        accessibility:{
            type:Sequelize.TINYINT,
            allowNull: false,
        },
        longitude:{
            type:Sequelize.DECIMAL(10,0),
            allowNull: false,
        },
        latitude:{
            type:Sequelize.DECIMAL(10,0),
            allowNull: false,
        },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
);

export default Building;