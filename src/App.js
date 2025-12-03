//src/App.js

//importo todo lo que quiera usar.

import React from 'react';
import {Routes, Route} from 'react-router-dom';
//barra de navegación
import NavBar from './components/NavBar';

//importo las páginas
import Home from './components/Home';
import About from './components/About';
import Project from './components/Project';
import Contact from './components/Contact';
import AlbumDetail from './components/AlbumDetail';
//importamos el css
import './App.css';

//crear la estructura del sitio
function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/album/:id" element={<AlbumDetail />} />
        </Routes>
    </div>
  );
}
export default App;


