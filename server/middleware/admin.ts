import { Request, Response, NextFunction } from "express";
import { prisma } from '../config/prisma.js';

const admin = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({message: "Desautorizado"})
        }
        const user = await prisma.user.findUnique({where: {id: userId}})
        if (!user){
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e)=>e.trim().toLowerCase()) : [];

        if(adminEmails.includes(user.email.toLowerCase())){
            if(req.user) req.user.isAdmin = true;
            next()
        }else{
            res.status(403).json({message: "Requiere acceso administrador"})
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: "Verificación Fallida Administrador", error: error.message})
    }
}

export default admin;