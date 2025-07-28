import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './components/Header'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'  // Asegúrate que esta ruta sea correcta

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-post/:postId" element={<EditPost />} /> {/* Aquí usé postId para coincidir */}
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </>
  )
}

export default App
