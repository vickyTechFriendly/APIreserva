import connection from "../config/db.js";
import Sequelize from "sequelize";
import Room from "./romms.js";

const Resource = connection.define(
    "resource",
    {
        resources_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        projector: {
            type: Sequelize.TINYINT,
            allowNull: true,
        },
        loudspeaker: {
            type: Sequelize.TINYINT,
            allowNull: true,
        },
        light: {
            type: Sequelize.TINYINT,
            allowNull: true,
        },
        wifi: {
            type: Sequelize.TINYINT,
            allowNull: true,
        },
        },
        {timestamps: false,freezeTableName: true}
);

export default Resource;

//relación resources - rooms
Resource.hasOne(Room, {
    foreignKey: "rooms_id",
    targetKey: "rooms_id", 
});

Room.hasOne(Resource, {
    foreignKey: "rooms_id",
    targetKey: "rooms_id", 
});