import express from "express";
import auth from "../middleware/auth.js"
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/addressController.js";

const addressRouter = express.Router()

addressRouter.get('/', auth, getAddresses)
addressRouter.post('/', auth, addAddress)
addressRouter.put('/:id', auth, updateAddress)     // Cambiado a .put()
addressRouter.delete('/:id', auth, deleteAddress)  // Cambiado a .delete()

export default addressRouter