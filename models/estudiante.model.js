import {pool} from "../database/connection.js"

const create = async (estudiante) =>{
    const querySQL = 
        'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;'
    const {rows} = await pool.query(querySQL, [estudiante.nombre, estudiante.rut, estudiante.curso, estudiante.nivel])
    return rows
}

const all = async () => {
    const {rows} = await pool.query("SELECT * FROM estudiantes")
    return rows
}

const one = async (rut) => {
    const querySQL = 'SELECT * FROM estudiantes WHERE rut = $1'
    const {rows} = await pool.query(querySQL, [rut])
    return rows[0]
}

const update = async (estudiante) => {
    const querySQL = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *;'
    const {rows} = await pool.query(querySQL, [estudiante.nombre, estudiante.curso, estudiante.nivel, estudiante.rut])
    return rows
}

const remove = async (rut) => {
    const querySQL = 'DELETE FROM estudiantes WHERE rut  = $1 RETURNING *;'
    const {rows} = await pool.query(querySQL, [rut])
    return rows
}

export const estudianteModel = {
    create,
    all,
    one,
    update,
    remove
}