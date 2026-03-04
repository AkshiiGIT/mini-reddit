import { useState } from "react";

function Post({ post, onDelete, onVote, onAddComment, onDeleteComment, currentUser }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const score = post.upvotes - post.downvotes;

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(post.id, {
      id: Date.now(),
      author: currentUser,
      content: commentText,
      date: new Date().toLocaleString(),
    });

    setCommentText("");
  };

  return (
    <div className="post">
      {/* Colonne des votes à gauche (style Reddit) */}
      <div className="vote-sidebar">
        <button className="upvote" onClick={() => onVote(post.id, "up")}>▲</button>
        <span className="score">{score}</span>
        <button className="downvote" onClick={() => onVote(post.id, "down")}>▼</button>
      </div>

      {/* Contenu principal du post */}
      <div className="post-content-area">
        <div className="post-meta">
          <span className="author">Posté par u/{post.author}</span>
          <span className="date">• {post.date}</span>
        </div>

        <h2 className="post-title">{post.title}</h2>
        <p className="post-text">{post.content}</p>

        <div className="post-actions">
          <button className="action-btn" onClick={() => setShowComments(!showComments)}>
            💬 {post.comments.length} Commentaires
          </button>

          {currentUser === post.author && (
            <button className="action-btn delete-btn" onClick={() => onDelete(post.id)}>
              🗑️ Supprimer
            </button>
          )}
        </div>

        {/* Section des commentaires */}
        {showComments && (
          <div className="comments-section">
            <form onSubmit={handleComment} className="comment-form">
              <input
                type="text"
                placeholder="Que pensez-vous de ceci ?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit">Répondre</button>
            </form>

            <div className="comments-list">
              {post.comments.length === 0 && (
                <p className="no-comments">Aucun commentaire pour le moment. Soyez le premier !</p>
              )}

              {post.comments.map((c) => (
                <div key={c.id} className="comment">
                  <div className="comment-meta">
                    <strong>u/{c.author}</strong> <span className="date">• {c.date}</span>
                  </div>
                  <p className="comment-text">{c.content}</p>
                  
                  {/* NOUVEAU : Bouton pour supprimer le commentaire si on est l'auteur */}
                  {currentUser === c.author && (
                    <button 
                      className="delete-comment-btn" 
                      onClick={() => onDeleteComment(post.id, c.id)}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;