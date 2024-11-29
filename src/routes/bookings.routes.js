import { Router } from "express";
import { getBookings,createBooking,updateBooking,deleteBooking,getBooking } from '../controllers/bookings.controllers.js'
const router=Router();
router.get('/GET/bookings',getBookings)
router.get('/GET/bookings/:codigo',getBooking)
router.post('/POST/bookings',createBooking)
router.patch('/PATCH/bookings/:codigo',updateBooking)
router.delete('/DELETE/bookings/:codigo',deleteBooking)

export default router