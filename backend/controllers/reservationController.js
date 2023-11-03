import Reservation from "../models/reservations.js";
import Resource from "../models/resources.js";
import Room from "../models/romms.js";

const getAll = async (req, res) => {
    try {
        let reservations = await Reservation.findAll({
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
                "user_id",
            ],
            include: [{
                model: Room,
                attributes: [
                    "building_id",
                    "room_id",
                    "name", 
                ],
            }],
                include: [{
                    model: Resource,
                    attributes: [
                        "resources_id",
                        "projector",
                        "loudspeaker",
                        "light",
                        "wifi",
                    ],
            }],

        });

        res.send(reservations);
    }
    catch (error) {
        res.status(500).send({
            message: error.message || 'Error retrieving reservations',
        });
    }
}



export default {
    getAll,
};