import connection from "../config/db.js";
import Sequelize from "sequelize";
import Building from "./buildings.js";

const Room = connection.define(
    "room",
    {
        room_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        capacity: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        officer: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        internalSchedule: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        publicSchedule: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        startHour: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        endHour: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        betweenSession: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        },
        {timestamps: false,freezeTableName: true}
);

export default Room;

//relación rooms - Building
Room.belongsTo(Building, {
    foreignKey: "building_id",
    targetKey: "building_id", 
});
Building.hasMany(Room, {
    foreignKey: "building_id",
    targetKey: "building_id", 
});