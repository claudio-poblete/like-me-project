/* eslint-disable react/prop-types */
import { useState } from 'react'
import axios from 'axios'

const Form = ({ onNewPost }) => {
  const [newPost, setNewPost] = useState({ titulo: '', img: '', descripcion: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/posts', newPost)
      onNewPost(response.data)
      setNewPost({ titulo: '', img: '', descripcion: '' })
    } catch (error) {
      console.error('Error al crear el post', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={newPost.titulo}
        onChange={(e) => setNewPost({ ...newPost, titulo: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={newPost.img}
        onChange={(e) => setNewPost({ ...newPost, img: e.target.value })}
        required
      />
      <textarea
        placeholder="Descripción"
        value={newPost.descripcion}
        onChange={(e) => setNewPost({ ...newPost, descripcion: e.target.value })}
        required
      ></textarea>
      <button type="submit">Crear Post</button>
    </form>
  )
}

export default Form

