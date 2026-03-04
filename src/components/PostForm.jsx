import { useState } from "react";

function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    onAddPost({
      id: Date.now(),
      title,
      content,
      author: author || "Anonyme",
      date: new Date().toLocaleString(),
      upvotes: 0,
      downvotes: 0,
      comments: []
    });

    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Contenu" value={content} onChange={e => setContent(e.target.value)} />
      <input placeholder="Auteur" value={author} onChange={e => setAuthor(e.target.value)} />
      <button type="submit">Publier</button>
    </form>
  );
}

export default PostForm;
