import Post from "./Post";

function PostList({ posts, ...props }) {
  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} {...props} />
      ))}
    </div>
  );
}

export default PostList;
