import Resource from "../models/resources.js";
import Room from "../models/romms.js";

const getAll = async (req, res) => {
    try {
        let rooms = await Room.findAll({
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
                "building_id",
            ],
        });
        res.send(rooms);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving rooms",
        });
    }
}

const getById = async (req, res) => {
    try {
    const room_id = req.params.id;
    let rooms = await Room.findByPk(room_id,{
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
            "building_id",
        ],
        include: [{
            model: Resource,
            attributes: [
                "projector",
                "loudspeaker",
                "light",
                "wifi",
            ],
        }],
    });
    res.send(rooms);
} catch (error) {
    res.status(500).send({
        message: error.message || "Error retrieving rooms",
    });
}
}


export default {
    getAll, 
    getById,
};
