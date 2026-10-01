
// Login Delivery Partner

import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { timeStamp } from "node:console";

const generateToken = (id: string) => {
    return jwt.sign({id, role: "domicilio"}, process.env.JWT_SECRET as string, {expiresIn: "30d"})
}

// POST /api/delivery/login
export const loginPartner = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "Por favor, proporcione el correo electrónico y la contraseña."})
    }

    const partner = await prisma.deliveryPartner.findUnique({where: {email: email.toLowerCase()}})

    if(!partner) {
        return res.status(401).json({message: "Por favor proporcione email y contraseña"});
    }
    
    if(!partner.isActive){
        return res.status(403).json({message: "Su cuenta esta desactivada"});
    }

    const isMatch = await bcrypt.compare(password, partner.password)
    if(!isMatch){
        return res.status(401).json({message: "Email o Contraseña Invalida"})
    }

    const token = generateToken(partner.id)
    const {password: _, ...partnerData} = partner;

    res.json({partner: partnerData, token})
}

// Get assigned deliveries
// GET /api/delivery/my-deliveries
export const getMyDeliveries = async (req: Request, res: Response) => {
    const { status } = req.query;

    const where: any = {getDeliveryPartnerId: req.partner!.id};

    if(status === "active"){
        where.status = {in: ["Asignado", "Empacado", "En reparto"]}
    } else if(status === "completed"){
        where.status = {in: ["Entregado", "Cancelado"]}
    }

    const orders = await prisma.order.findMany({
        where,
        include: {user: {select: {name: true, email: true, phone: true}}},
        orderBy: {createdAt: "desc"}
    })

    res.json({orders})
}

// Get single delivery detail
// GET /api/delivery/my-deliveries/:id
export const getDeliveryDetail = async (req: Request, res: Response) => {
    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, deliveryPartnerId: req.partner!.id},
        include: {user: {select: {name: true, email: true, phone: true}}}
    })

    if(!order) {
        return res.status(404).json({message: "Entrega mo Encontrada"})
    }

    res.json({order})
}

// Complete delivery with OTP
// PUT /api/delivery/my-deliveries/:id/complete
export const completeDelivery = async (req: Request, res: Response) => {
    const {otp} = req.body;
    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, deliveryPartnerId: req.partner!.id}
    })

    if(!order || order.status === "Cancelado" || order.status === "Entregado"){
        return res.status(400).json({message: "Solicitud no Valida"})
    }

    if(order.deliveryOtp !== otp){
        return res.status(500).json({message: "Invalido OTP"})
    }

    const history = order.statusHistory as any[];

    history.push({status: 'Entregado', note: "Entrego por el socio", timeStamp: new Date()})

    const updatedOrder = await prisma.order.update({
        where: {id: order.id},
        data: {status: "Entregado", statusHistory: history, deliveryOtp: ""}
    })

    res.json({order: updatedOrder, message: "Entrega Completada con éxito"})
}

// Cancel delivery
// PUT /api/delivery/my-deliveries/:id/cancel
export const cancelDelivery = async (req: Request, res: Response) => {
    const { reason } = req.body;
    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, deliveryPartnerId: req.partner!.id}
    })

    if (order!.status === "Entregado"){
        return res.status(400).json({message: "No se puede cancelar un pedido entregado"});
    }

    const history = order!.statusHistory as any[];

    history.push({status: 'Cancelado', note: reason || "", timeStamp: new Date()})

    const updatedOrder = await prisma.order.update({
        where: {id: order!.id},
        data: {status: "Cancelado", statusHistory: history}
    })

    res.json({order: updatedOrder, message: "Domicilio Cancelado"})
}

// Update order status
// PUT /api/delivery/my-deliveries/:id/status
export const updateDeliveryStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    const allowedStatuses = ['Empacado', "En Reparto"];

    if(!allowedStatuses.includes(status)){
        return res.status(400).json({message: "Actualización de estado no valida"})
    }

    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, deliveryPartnerId: req.partner!.id}
    })

    const history = order!.statusHistory as any[];

    history.push({status, note: `Status updated to ${status}`, timestamp: new Date()})

    const updatedOrder = await prisma.order.update({
        where: {id: order!.id},
        data: {status, statusHistory: history}
    })

    res.json({order: updatedOrder})
}

// Update live location
// PUT /api/delivery/my-deliveries/:id/location

export const updateLocation = async (req: Request, res: Response) => {
    const {lat, lng} = req.body;
    const order = await prisma.order.findFirst({
        where: {
            id: req.params.id as string,
            deliveryPartnerId: req.partner!.id,
            status: {in: ["Asignado", "Empacado", "En reparto"]}
        }
    })

    await prisma.order.update({
        where: {id: order!.id},
        data: {liveLocation: {lat, lng, updatedAt: new Date()}}
    })
    
    res.json({success: true})
}