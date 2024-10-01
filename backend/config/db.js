import mongoose from 'mongoose'

export const connectToDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}` );
        
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // process code 1 means failure an 0 means success
    }
}