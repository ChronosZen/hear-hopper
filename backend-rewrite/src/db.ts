import mongoose from 'mongoose';

export const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

