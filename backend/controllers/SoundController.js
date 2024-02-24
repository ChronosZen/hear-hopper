import Sound from '../models/Sound.js';

const SoundController = {
    get: async (req, res) => {
        try {
            const sound = await Sound.find({});
            res.json(sound);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
};

export default SoundController;
