import Resource from '../models/resources.js';

const getAll = async (req, res) => {
    try {
        let resources = await Resource.findAll({
            attributes: [
                'resources_id',
                'projector',
                'loudspeaker',
                'light',
                'wifi',
                'quantity',
            ],
        });
        res.send(resources);
    }
    catch (error) {
        res.status(500).send({
            message: error.message || 'Error retrieving resources',
        });
    }
}

export default {
    getAll,
};

