import { Request,Response, NextFunction } from "express";
import {verifyToken } from "../utils/jwt";
import {sendError}  from "../utils/response";

export const authMiddleware = (req:Request,res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith("Bearer")){
        return sendError(res,"Unauthorized",401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyToken(token );
        req.user = {id:payload.id, email:payload.email};
        next();
    }catch{
        sendError(res,"Invalid or expired token",401);}

    };