import Building from "../models/buildings.js";

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

export default {
    getAll,
};