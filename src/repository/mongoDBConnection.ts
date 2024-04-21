import mongoose from "mongoose";
import config from "../config/config";

// Connect to MondoDb
const connectToDatabase = async () => {
    const mongo_db_URI = config.MONGODB_CONNECTION_STRING;
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