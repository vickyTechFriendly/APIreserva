import connection from "../config/db.js";
import Sequelize from "sequelize";
import Room from "./romms.js";
import Reservation from "./reservations.js";

const Resource = connection.define(
    "resources",
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
    foreignKey: "room_id",
    targetKey: "room_id", 
});

Room.hasOne(Resource, {
    foreignKey: "room_id",
    targetKey: "room_id", 
});

//relación resources - reservations
Resource.hasOne(Reservation, {
    foreignKey: "resources_id",
    targetKey: "resources_id", 
});
Reservation.hasOne(Resource, {
    foreignKey: "resources_id",
    targetKey: "resources_id", 
});