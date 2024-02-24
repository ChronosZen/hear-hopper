import Images from '../models/Images.js';

const ImagesController = {
    get: async (req, res) => {
        try {
            const images = await Images.find({});
            res.json(images);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
};

export default ImagesController;
