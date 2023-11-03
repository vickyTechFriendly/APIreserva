import User from "../models/users.js";
//import bcrypt from "bcrypt";
import Reservation from "../models/reservations.js";

const getAll = async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: [
                "user_id",
                "email",
                "name",
                "role",
                "lastName",
                "telephone",
                "organization",
            ],
            include: [{
                model: Reservation,
                attributes: [
                    "reservation_id",
                    "participants",
                    "status",
                    "notification",
                    "startReservation",
                    "length",
                    "frequency",
                    "daysOfWeek",
                    "endReservation",
                    "comment",
                    "room_id",
                ],
            }],
        });
        res.send(users);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving users",
        });
    }
};

export default {
    getAll,};