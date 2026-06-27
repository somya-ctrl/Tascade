import {Request,Response,NextFunction} from "express";
import { authService } from "../services/auth.service";
import {sendSuccess,sendError} from "../utils/response";
 export const authController = {
    async signup(req:Request, res:Response , next:NextFunction){
        try{
            const result = await authService.signup(req.body);
            sendSuccess(res,result,201);

        }
        catch(err){
            if((err as Error).message === "Email already in use")
                return sendError(res,"Email already in use",409);
            next(err);
        }
    },
    async login(req:Request, res:Response , next :NextFunction){
        try{
            const result = await authService.login(req.body);
            sendSuccess(res,result);
        }catch(err){
            if((err as Error).message === "Invalid Credentials") 
                return sendError(res,"Invalid credentials",401);
            next(err);
        }
    },
 };