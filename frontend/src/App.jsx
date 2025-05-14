import React from "react";
import { Sidebar } from "./components/SideBars";
import { MainBar } from "./components/MainTest/MainBar";
function App() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <MainBar />
    </div>
  );
}

export default App;
