import express from 'express';
import roomsRoutes from './routes/rooms.routes.js'
import bookingsRoutes from './routes/bookings.routes.js'
const app = express();
const PORT=3000

app.use(express.json())
app.use(roomsRoutes)
app.use(bookingsRoutes)



app.listen(PORT);
console.log('Servidor corriendo en puerto',PORT);