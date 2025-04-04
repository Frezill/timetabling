import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar'
import './styles/App.css'
import Home from './pages/Home'
import Footer from './components/Footer';
import Schedules from './pages/Schedules';

function App() {

  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/schedules" element={<Schedules />}></Route>
          </Routes>
          <Footer />
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </>
  )
}

export default App
