import { useState, useEffect } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import "./index.css";

const CURRENT_USER = "Akshii";

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts([post, ...posts]); // On met le nouveau post en haut de la liste
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const vote = (id, type) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              upvotes: type === "up" ? post.upvotes + 1 : post.upvotes,
              downvotes: type === "down" ? post.downvotes + 1 : post.downvotes,
            }
          : post
      )
    );
  };

  const addComment = (postId, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  // Fonction pour supprimer un commentaire
  const deleteComment = (postId, commentId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter(c => c.id !== commentId) }
          : post
      )
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🔥 Mini Reddit</h1>
        <div className="user-badge">Connecté en tant que <strong>u/{CURRENT_USER}</strong></div>
      </div>

      <PostForm onAddPost={addPost} />

      <PostList
        posts={posts}
        onDelete={deletePost}
        onVote={vote}
        onAddComment={addComment}
        onDeleteComment={deleteComment} /* On passe la fonction aux enfants */
        currentUser={CURRENT_USER}
      />
    </div>
  );
}

export default App;