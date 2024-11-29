import { Router } from "express";
import { getRooms,createRoom,updateRoom,deleteRoom,getRoom } from '../controllers/rooms.controllers.js'
const router=Router();
router.get('/GET/rooms',getRooms)
router.get('/GET/rooms/:codigo',getRoom)
router.post('/POST/rooms',createRoom)
router.patch('/PATCH/rooms/:codigo',updateRoom)
router.delete('/DELETE/rooms/:codigo',deleteRoom)

export default router