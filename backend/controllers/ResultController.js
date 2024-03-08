import Result from '../models/Result.js';

const ResultController = {
    // Get all results
    get: async (req, res) => {
        try {
            const results = await Result.find({});
            res.json(results);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },

    // Get results by user and kid ID
    getById: async (req, res) => {
        const { userID, kidID } = req.params;
        try {
            const results = await Result.find({ userID: userID, kidID: kidID});
            if (!results) {
                return res.status(404).send('Results not found');
            }
            res.json(results);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },

    // Create new result for a user or kid
    post: async (req, res) => {
        const { userID, kidID, hearingAbility } = req.body;  
        try {
            console.log('Request body:', req.body); 
            const newResult = new Result({
                userID,
                kidID,
                hearingAbility
            });
            console.log('New result:', newResult); 
            await newResult.save();
            res.status(201).send('Result created successfully');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    

    // Update existing result by appending rightEar and leftEar results
    update: async (req, res) => {
        const { userID, kidID } = req.params;
        const { leftFrequency, leftDecibel, rightFrequency, rightDecibel} = req.body;
        try {
            const result = await Result.findOne({ userID: userID, kidID: kidID });
            if (!result) {
                return res.status(404).send('Result not found');
            }
            let leftEar = {
                leftFrequency: leftFrequency, 
                leftDecibel: leftDecibel
            }
            let rightEar = {
                rightFrequency: rightFrequency, 
                rightDecibel: rightDecibel
            }

            // Append new leftEar and rightEar results
            result.leftEar.push(leftEar);
            result.rightEar.push(rightEar);
            
            await result.save();
            res.status(200).send('Result updated successfully');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
};

// Function to calculate average decibel value
// function calculateAverageLeft(data) {
//     if (data.length === 0) return 0;
//     const sum = data.reduce((acc, curr) => acc + curr.leftDecibel, 0);
//     return sum / data.length;
// }
// function calculateAverageRight(data) {
//     if (data.length === 0) return 0;
//     const sum = data.reduce((acc, curr) => acc + curr.leftDecibel, 0);
//     return sum / data.length;
// }

export default ResultController;