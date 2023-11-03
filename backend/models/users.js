import connection from "../config/db.js";
import sequelize from "sequelize";

const User = connection.define(
    "user",
    {
        user_id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
        email: {
            type: sequelize.STRING(45),
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize.STRING(100),
            allowNull: false,
        },
        name: {
            type: sequelize.STRING(45),
            allowNull: true,
        },
        lastName: {
            type: sequelize.STRING(45),
            allowNull: true,
        },
        telephone: {
            type: sequelize.STRING(45),
            allowNull: true,
        },
        organization: {
            type: sequelize.STRING(45),
            allowNull: true,
        },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
);

export default User;
