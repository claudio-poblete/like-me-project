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

router.put('/:id/like', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).send('Error al registrar el like')
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).send('Error al eliminar el post')
  }
})

module.exports = router
