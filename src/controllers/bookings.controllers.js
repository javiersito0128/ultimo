import { pool } from "../db.js";

export const getBookings = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM reservas');
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
}
export const getBooking = async (req, res) => {
    const { codigo } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM reservas WHERE codigo = ?', [codigo]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.send(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la reserva' });
    }
}
export const createBooking = async (req, res) => {
    const { codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO reservas (codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida]
        );
        res.status(201).send({
            codigo,
            codigo_habitacion,
            nombre_cliente,
            telefono_cliente,
            fecha_reservacion,
            fecha_entrada,
            fecha_salida
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reserva' });
    }
}
export const updateBooking = async (req, res) => {
    const { codigo } = req.params;
    const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE reservas SET codigo_habitacion = ?, nombre_cliente = ?, telefono_cliente = ?, fecha_reservacion = ?, fecha_entrada = ?, fecha_salida = ? WHERE codigo = ?',
            [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida, codigo]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        const [rows] = await pool.query('SELECT * FROM reservas WHERE codigo = ?', [codigo]);
        res.send(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la reserva' });
    }
}
export const deleteBooking = async (req, res) => {
    const { codigo } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM reservas WHERE codigo = ?', [codigo]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la reserva' });
    }
}