import { prisma } from "../config/db";
import { hashPassword,comparePassword } from "../utils/hash";
import {signToken } from "../utils/jwt";

export const authService = {
    async signup(data: {name :string, email:string, password:string}){
        const existing = await prisma.user.findUnique({where:{email :data.email}});
        if(existing) throw new Error ("Email already in use");

        const hashed = await hashPassword(data.password);
        const user = await prisma.user.create({
            data: { name : data.name, email:data.email, password:hashed},
            select:{ id:true, name : true, email:true, createdAt :true},
        });
        const token = signToken({id:user.id , email :user.email});
        return {user,token};
    },
    async login(data:{email:string; password:string}){
        const user = await prisma.user.findUnique({where: {email:data.email}});
        if(!user) throw new Error ("Invalid Credentials");
        const valid = await comparePassword(data.password, user.password);
        if(!valid) throw new Error ("Invalid Credentials");

        const token =signToken({id:user.id, email:user.email});
        return {
            user:{id:user.id , name :user.name , email :user.email , createdAt :user.createdAt },
            token,
        };
    },
};