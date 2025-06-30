import mongoose from "mongoose";

const ConnectMongo = async ()=>{
    try{

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

        console.log("MongoDB connected successfully");

    }catch(error){
        console.error("MongoDB connection error:", error);
        
    }
    
}
export default ConnectMongo;