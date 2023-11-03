import Building from "../models/buildings.js";
import Room from "../models/romms.js";
import Reservation from "../models/reservations.js";
const getAll = async (req, res) => {
    try {
        let buildings = await Building.findAll({
            attributes: [
                "building_id",
                "name",
                "accessibility",
                "longitude",
                "latitude",
            ],
        });
        res.send(buildings);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving buildings",
        });
    }
}

const getById = async (req, res) => {
    try {
        const building_id = req.params.id;
        let buildings = await Building.findByPk(building_id,{
            attributes: [
                "building_id",
                "name",
                "accessibility",
                "longitude",
                "latitude",
            ],
            include: [{
                model: Room,
                attributes: [
                    "room_id",
                    "name",
                    "capacity",
                    "officer",
                    "InternalSchedule",
                    "publicSchedule",
                    "startHour",
                    "endHour",
                    "betweenSession",
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
                    ],
                }],
            }],
        });
        res.send(buildings);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving buildings",
        });
    }
}

//todas las reservas de un edificio
const getReservations = async (req, res) => {
    try{
        const building_id = req.params.id;
        let buildings = await Building.findByPk(building_id,{
            attributes: [
                "building_id",
                "name",
            ],
            include: [{
                model: Room,
                attributes: [
                    "room_id",
                    "name",
                    "capacity",
                    "officer",
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
                    ],
                }],
            }],
        });
        res.send(buildings);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving buildings",
        });
    }
}

export default {
    getAll,
    getById,
    getReservations,
};