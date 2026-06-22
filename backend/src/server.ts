import app from "./app";
import {env} from "./config/env";
import {prisma} from "./config/db";

const start = async() =>{
    try{
        await prisma.$connect();
        console.log("Database Connected");
        app.listen(env.PORT,()=>{
            console.log(`Server is running on port ${env.PORT}`);

        });
    }
    catch(error){
        console.error("Failed to start server:",error);
        await prisma.$disconnect();
        process.exit(1);
    }
};
start();