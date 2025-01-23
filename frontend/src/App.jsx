import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Shop from "./Components/Shop";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Shop />} />
        </Routes>
    </Router>
  );
};

export default App;
