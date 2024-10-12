const express = require('express')
const cors = require('cors')
const postsRoutes = require('./routes/posts')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/posts', postsRoutes)

app.get('/', (req, res) => {
  res.send('Servidor de Like Me funcionando')
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})

