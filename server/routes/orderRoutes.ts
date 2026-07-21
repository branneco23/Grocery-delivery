import express from "express";
import auth from "../middleware/auth.js";
import {createOrder, getOrderLocation, getUserOrders, getAllOrders, getOrder, updateOrderStatus} from "../controllers/corderController.js";
import admin from "../middleware/admin.js";

const orderRouter = express.Router();

orderRouter.post('/', auth, createOrder),
orderRouter.get('/', auth, getUserOrders);
orderRouter.get('/all', auth, admin, getAllOrders)
orderRouter.get('/:id', auth, getOrder)
orderRouter.put('/:id/status', auth, admin, updateOrderStatus)
orderRouter.get('/:id/location', auth, getOrderLocation)

export default orderRouter