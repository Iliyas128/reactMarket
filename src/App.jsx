import MainPages from './pages/mainPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router";
import ProductPage from './pages/productPage';
import { useEffect } from 'react';

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPages />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  )
}

export default App
