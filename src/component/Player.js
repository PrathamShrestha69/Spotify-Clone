import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { BsFillFilePlayFill } from "react-icons/bs";
import { TiMicrophone } from "react-icons/ti";
import { HiOutlineQueueList } from "react-icons/hi2";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { IoIosRepeat } from "react-icons/io";
import { PiDevicesBold } from "react-icons/pi";
import { TfiControlShuffle } from "react-icons/tfi";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(7); // Current playback time in seconds
  const totalDuration = 256; // Total duration in seconds (4:16)

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="bg-black p-4 text-white flex items-center justify-between h-24">
      {/*  Playback Controls */}
      <div className="flex flex-col items-center justify-center w-full mx-4">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <TfiControlShuffle size={24} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <FaBackwardStep size={24} />
          </button>
          <button onClick={togglePlayPause} className="text-white">
            {isPlaying ? (
              <FaCirclePause size={30} />
            ) : (
              <FaCirclePlay size={30} />
            )}
          </button>
          <button className="text-gray-400 hover:text-white">
            <FaForwardStep size={24} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <IoIosRepeat size={24} />
          </button>
        </div>
        {/* progeress */}
        <div className="flex justify-between text-xs mb-1 w-96">
          <span>{`${Math.floor(progress / 60)}:${
            progress % 60 < 10 ? "0" : ""
          }${progress % 60}`}</span>
          <input
            type="range"
            className="w-full accent-white "
            min="0"
            max={totalDuration}
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          />
          <span>{`${Math.floor(totalDuration / 60)}:${
            totalDuration % 60 < 10 ? "0" : ""
          }${totalDuration % 60}`}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center">
        <BsFillFilePlayFill size={20} className="mr-2" />
        <TiMicrophone size={20} className="mr-2" />
        <HiOutlineQueueList size={20} className="mr-2" />
        <PiDevicesBold size={20} className="mr-2" />
        <FaVolumeUp size={20} className="mr-2" />
        <input
          type="range"
          className="w-24 accent-white "
          min="0"
          max="100"
          defaultValue="50"
        />
      </div>
    </div>
  );
};

export default Player;
