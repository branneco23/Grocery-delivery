import express from "express";
import auth from "../middleware/auth.js"
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/addressController.js";

const addressRouter = express.Router()

addressRouter.get('/', auth, getAddresses)
addressRouter.post('/', auth, addAddress)
addressRouter.post('/:id', auth, updateAddress)
addressRouter.post('/:id', auth, deleteAddress)

export default addressRouter