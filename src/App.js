import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './layout/Header/Header';
import PostCards from './components/PostCards';
import CommentsPage from './components/PostCards/Comments';
import AlbumPhotos from './components/AlbumCards/AlbumPhotos';
import AlbumsCards from './components/AlbumCards';
import { ChakraProvider } from '@chakra-ui/react'



function App() {

  return (

    <Router>

      <Header />

      <Routes>

        <Route path="/" element={<PostCards />} />
        <Route path="/comments/:id" element={<CommentsPage />} />
        <Route path="/" element={<AlbumsCards />} />
        <Route path="/albums/:id" element={<AlbumPhotos />} />
      </Routes>


    </Router>


  );
}

export default App;

