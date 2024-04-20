import mongoose from "mongoose";

const connectToDatabase = async () => {
    const mongo_db_URI = 'mongodb+srv://root:Broccoli67@clustermit.x6pozd4.mongodb.net/sandbox?retryWrites=true&w=majority&appName=ClusterMit';
    try {
        mongoose
        .connect(mongo_db_URI);
    } catch (error) {
        console.log('Error connecting to database', error);
        throw error;
    }
}

const connectToMongoDB = async () => {
    connectToDatabase();
}

export default connectToMongoDB;