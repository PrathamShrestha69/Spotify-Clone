import React from "react";
import Navbar from "./component/Navbar";
import Player from "./component/Player";

const App = () => {
  return (
    <div className="bg-black">
      <div className="App flex flex-col h-auto">
        <Navbar />

        <div className="fixed bottom-0 left-0 right-0">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default App;
