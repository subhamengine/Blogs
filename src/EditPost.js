import React, { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext"
import { format } from 'date-fns'
import api from './api/posts'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();


  const { posts, setPosts } = useContext(DataContext);

  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditBody('');
      setEditTitle('');
      navigate('/');
    } catch (err) {

    }
  }

  return <main className="NewPost">
    {editTitle &&
      <>
        <h2>Edit Post</h2>
        <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            id="postTitle"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor="postBody">Post:</label>
          <textarea
            id="postBody"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            required
          ></textarea>
          <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
        </form>
      </>
    }{!editTitle &&

      <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to='/'>Visit Our Homepage</Link>
        </p>
      </>
    }
  </main>

};

export default EditPost;
