import connection from "../config/db.js";
import Sequelize from "sequelize";
import User from "./users.js";
import Room from "./romms.js";

const Reservation = connection.define(
    "reservation",
    {
        reservation_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        participants: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        notification: {
            type: Sequelize.TINYINT,
            allowNull: true,
        },
        startReservation: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        length: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        frequency: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        daysOfWeek: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        endReservation: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        comment: {
            type: Sequelize.STRING(300),
            allowNull: true,
        },
        title: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        },
        {freezeTableName: true, timestamps: false,}
);

export default Reservation;

//relación reservation - user
Reservation.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id", 
});
User.hasMany(Reservation, {
    foreignKey: "user_id",
    targetKey: "user_id", 
});

//relación reservation - room
Reservation.belongsTo(Room, {
    foreignKey: "room_id",
    targetKey: "room_id", 
});
Room.hasMany(Reservation, {
    foreignKey: "room_id",
    targetKey: "room_id", 
});