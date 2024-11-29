import {createPool} from "mysql2/promise";
export const pool=createPool({
    hot:'localhost',
    user:'root',
    password:'3008',
    port:3306,
    database:'hoteldb'
})
