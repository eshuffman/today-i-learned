import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Home from '../home/Home';
import Landing from '../landing/Landing';
import Why from '../why/Why';

const App = () => (
  <BrowserRouter>
    <div id="content">
      <Routes>
        <Route path="/" element={ <Landing />} />
        <Route path="/why" element={ <Why />} />
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