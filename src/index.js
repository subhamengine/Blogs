import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route, useHistory } from "react-router-dom";
import About from './About'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Router>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path='/about' />
        <Route path='/post' />
        <Route path='/post/:id' />
        <Route path='*' />
      </Route>
    </Routes>
  </Router>

);

