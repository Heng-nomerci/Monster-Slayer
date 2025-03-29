import Header from "./components/Header";
import Game from "./components/Game";
import React, { useState } from "react";
import "./index.css";
function App() {
  return (
    <div className="App">
      <Header gameName="MONSTER SLAYER" />
      <Game />
    </div>
  );
}

export default App;
