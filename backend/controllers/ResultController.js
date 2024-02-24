import Result from '../models/Result.js';

const ResultController = {
    get: async (req, res) => {
        try {
            const results = await Result.find({});
            res.json(results);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    post: async (req, res) => {
        const { testType, userID, timestamp, hearingAbility } = req.body;  
        try {
            const newResult = new Result({
                testType,
                userID,
                timestamp,
                hearingAbility
            });
            await newResult.save();
            res.status(201).send('Result created successfully');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
};

export default ResultController;
