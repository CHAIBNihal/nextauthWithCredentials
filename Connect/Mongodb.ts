import mongoose from "mongoose";

export const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("Connected to your data base ")
    } catch (error) {
        console.log("Failed to connect into dataBase ", error)
    }
}