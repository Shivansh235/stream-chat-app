import mongoose from "mongoose";
export const ConnDB = async()=>{
    try {
      const conn =  await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1);// 1 means the failure of the code
        
    }
}