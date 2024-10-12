const express = require('express')
const { Pool } = require('pg')
const router = express.Router()

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: 'Conejo183$',
  port: 5432
})

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts')
    res.json(result.rows)
  } catch (error) {
    res.status(500).send('Error al obtener los posts')
  }
})

router.post('/', async (req, res) => {
  const { titulo, img, descripcion } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
      [titulo, img, descripcion]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).send('Error al crear el post')
  }
})

module.exports = router
