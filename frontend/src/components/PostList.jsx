/* eslint-disable react/prop-types */
const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.titulo}</h3>
          <img src={post.img} alt={post.titulo} />
          <p>{post.descripcion}</p>
          <p>Likes: {post.likes}</p>
        </li>
      ))}
    </ul>
  )
}

export default PostList
