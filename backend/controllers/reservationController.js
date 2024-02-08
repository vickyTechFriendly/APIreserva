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
                "title",
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

const getById = async (req, res) => {
    try{
    const reservation_id = req.params.reservation_id;
    let reservation = await Reservation.findByPk(reservation_id, {
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
            "title",
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
    res.send(reservation);
} catch (error) {
    res.status(500).send({
        message: error.message || 'Error retrieving reservation',
    });
}
};

const create = async (req, res) => {
    let newResources = null;
    try {
        const user_id = req.params.id; 

        const newReservation = await Reservation.create({
            user_id: user_id,
            participants: req.body.participants,
            status: req.body.status,
            notification: req.body.notification,
            startReservation: req.body.startReservation,
            length: req.body.length,
            frequency: req.body.frequency,
            daysOfWeek: req.body.daysOfWeek,
            endReservation: req.body.endReservation,
            room_id: req.body.room_id,
            comment: req.body.comment,
            title: req.body.title,
        });
// Luego, verificar si hay datos de recursos en la petición y crear los recursos asociados
if (req.body.resources) {
    newResources = await Resource.create({
        projector: req.body.resources.projector,
        loudspeaker: req.body.resources.loudspeaker,
        light: req.body.resources.light,
        wifi: req.body.resources.wifi,
        quantity: req.body.resources.quantity,
        reservation_id: newReservation.reservation_id, // Usa el ID de reserva generado para asociar los recursos
        room_id: newReservation.room_id // Asegúrate de que este valor esté disponible y sea correcto
    });
}

// Devolver respuesta incluyendo tanto la reserva como los recursos creados
return res.status(201).json({
    message: 'Reservation and Resources created successfully',
    data: {
        reservation: newReservation,
        resources: newResources || 'No resources provided'
    },
});
} catch (error) {
console.log("Error al crear la reserva y/o recursos: ", error);
res.status(500).json({
    message: 'Algo salió mal',
    error: error.message,
});
}
};



export default {
    getAll,
    getById,
    create,
};