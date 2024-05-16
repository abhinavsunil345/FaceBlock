import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Login from './UI/Login';
import MessageBoard from './UI/MessageBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/MessageBoard" element={<MessageBoard/>} />
      </Routes>
    </Router>
  );
}

export default App;
