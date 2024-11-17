import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { FaSpotify, FaSearch } from "react-icons/fa";
import { GrInstallOption } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import SearchTab from "./RightTab";
import Home from "./Home"; // Import Home component
import Sidebar from "./LeftTab";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isHome, setIsHome] = useState(true); // Start with Home as default

  const search = async (term) => {
    if (!term) return;

    const url =
      "https://spotify-scraper.p.rapidapi.com/v1/search?term=Jazz&type=all";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "ad85cc08a5msh86f530e72bd7811p1260abjsn53db6323e470",
        "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result);

      setSearchResults(result.albums?.items || []); // Safely access album items
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleHomeClick = () => {
    setIsHome(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsHome(false); // Switch to search results view
    search(searchTerm); // Trigger search
  };

  return (
    <div className="bg-black min-h-screen">
      <nav className="bg-black p-4 text-white fixed top-0 left-0 right-0 z-50">
        <ul className="flex justify-between items-center w-full">
          <li className="flex items-center">
            <FaSpotify size={30} />
          </li>

          <div className="flex-grow flex justify-center mx-4 gap-4">
            <button
              onClick={handleHomeClick}
              className="bg-gray-900 rounded-full p-2 focus:outline-none hover:bg-gray-700 transition"
            >
              <GoHome size={30} aria-label="Home" />
            </button>

            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-md"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="What do you want to play?"
                className="bg-gray-900 text-white placeholder-gray-500 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-700 w-full"
              />
            </form>
          </div>

          <div className="flex space-x-4 items-center">
            <li className="flex items-center font-bold text-black bg-white rounded-full px-4 py-1">
              Explore Premium
            </li>
            <li className="flex items-center font-bold">
              <GrInstallOption
                size={20}
                className="mr-1"
                aria-label="Install App"
              />
            </li>
            <li className="flex items-center">
              <IoMdNotificationsOutline size={30} aria-label="Notifications" />
            </li>
            <li className="flex items-center">
              <MdAccountCircle size={30} aria-label="Account" />
            </li>
          </div>
        </ul>
      </nav>

      <div className="pt-20 flex h-auto gap-5">
        <Sidebar />
        <div className="w-4/5">
          {isHome ? (
            <Home />
          ) : (
            <SearchTab
              results={searchResults.map((album) => ({
                id: album?.id,
                name: album?.name,
                artist: album?.artists?.[0]?.name,
                cover: album?.cover?.[2]?.url || album?.cover?.[0]?.url,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
