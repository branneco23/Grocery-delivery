import express from "express";
import auth from "../middleware/auth.js";
import { createOrder, getOrderLocation, getUserOrders, getAllOrders, getOrder, updateOrderStatus } from "../controllers/orderController.js";
import admin from "../middleware/admin.js";

const orderRouter = express.Router();

// Rutas POST y GET ordenadas correctamente
orderRouter.post('/', auth, createOrder);
orderRouter.get('/user', auth, getUserOrders); // Cambiado temporalmente o ajustado para evitar choque de rutas GET /
orderRouter.get('/all', auth, admin, getAllOrders);
orderRouter.get('/:id/location', auth, getOrderLocation);
orderRouter.get('/:id', auth, getOrder);
orderRouter.put('/:id/status', auth, admin, updateOrderStatus);

export default orderRouter;