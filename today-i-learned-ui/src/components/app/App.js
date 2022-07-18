import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../home/Home';

const App = () => (
  <BrowserRouter>
    <div id="content">
      <Routes>
        <Route path="/" element={ <Home />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  </BrowserRouter>
);

export default App;