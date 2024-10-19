/* eslint-disable react/prop-types */
import axios from 'axios';
import { FaTrash, FaHeart } from 'react-icons/fa';

const PostList = ({ posts, fetchPosts }) => {
  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:3000/posts/${id}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.titulo}</h3>
          <img src={post.img} alt={post.titulo} />
          <p>{post.descripcion}</p>
          <p>Likes: {post.likes}</p>
          <button className="like" onClick={() => handleLike(post.id)}>
            <FaHeart /> Like
          </button>
          <button className="delete" onClick={() => handleDelete(post.id)}>
            <FaTrash /> Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;

