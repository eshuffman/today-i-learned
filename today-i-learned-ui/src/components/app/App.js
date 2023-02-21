import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Home from '../home/Home';
import Landing from '../landing/Landing';
import Why from '../why/Why';
import AllFacts from '../all-facts/AllFacts';
import FactsForReview from '../facts-for-review/FactsForReview';
import AddFact from '../add-fact/AddFact';

const App = () => (
  <BrowserRouter>
    <div id="content">
      <Routes>
        <Route path="/" element={ <Landing />} />
        <Route path="/why" element={<Why />} />
        <Route path="/facts" element={<AllFacts />} />
        <Route path="/facts/review" element={<FactsForReview />} />
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
      <div>
        <AddFact />
      </div>
    </div>
  </BrowserRouter>
);

export default App;