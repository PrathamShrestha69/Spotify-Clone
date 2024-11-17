import React from "react";
import Album from "./Track";
import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <div className="bg-black text-white px-3 overflow-y-auto h-auto">
      <div className="bg-slate-800 text-white p-6 rounded-md w-11/12 h-full">
        <HomeContent />
      </div>
    </div>
  );
};

export default Home;
