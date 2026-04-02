import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import CollegeDetail from './pages/CollegeDetail';
import './styles/global.scss';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/college/:id" element={<CollegeDetail />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;