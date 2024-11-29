import { pool} from "../db.js"

export const getRooms=async(req,res)=>{
    const [rows] = await pool.query('SELECT * FROM habitaciones')
    res.send(rows)
}
export const getRoom=async(req,res)=>{
    const codigo=req.params.codigo
    const [rows] = await pool.query('SELECT * FROM habitaciones WHERE codigo =?',[codigo])
    if(rows.length<=0) return res.status(400).json({
        message:'Habitación no Registrada'
    })
    res.send(rows[0])
}
export const createRoom = async (req, res) => {
    const { codigo, numero, tipo, valor } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO habitaciones (codigo, numero, tipo, valor) VALUES (?, ?, ?, ?)', 
            [codigo, numero, tipo, valor]
        );
        res.send({
            codigo,
            numero,
            tipo,
            valor
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar habitación');
    }
}
export const updateRoom=async(req,res)=>{
    const {codigo}=req.params
    const {numero, tipo,valor}=req.body
    const [result]=await pool.query('UPDATE habitaciones SET numero=?,tipo=?,valor=? WHERE codigo=?',[numero,tipo,valor,codigo])
    if (result.affectedRows<=0) return res.status(404).json({
        message:'Usuario no encontrado'
    })
    const [rows] = await pool.query('SELECT * FROM habitaciones WHERE codigo =?',[codigo])
    res.send(rows[0])
}
export const deleteRoom=async(req,res)=>{
    const {codigo}=req.params
    const [result] = await pool.query('DELETE FROM habitaciones WHERE codigo=?',[codigo])
    //console.log(result);
    if(result.affectedRows<=0) return res.status(404).json({
        message:'Habitación no encontrada'
    })
    res.status(204).send()
}