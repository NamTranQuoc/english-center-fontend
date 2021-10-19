import './App.css';
import React from "react";
import MainRoute from "./screens/MainRoute";
import {ToastContainer} from "react-toastify";

function App() {
  return (
      <div className="container">
          <ToastContainer closeButton={true} position="bottom-right"/>
          <MainRoute/>
      </div>
  );
}

export default App;
