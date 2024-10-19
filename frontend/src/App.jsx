import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import PostList from './components/PostList'

const App = () => {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts')
      setPosts(response.data)
    } catch (error) {
      console.error('Error al obtener los posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  return (
    <div className="container">
      <h1>Like Me - Publicaciones</h1>
      <Form onNewPost={handleNewPost} />
      <PostList posts={posts} fetchPosts={fetchPosts}/>
    </div>
  )
}

export default App

