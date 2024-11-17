import React, { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import "../index.css"; // Assuming you're using Tailwind CSS

const Sidebar = () => {
  const [playlist, setPlaylist] = useState(null); // State to hold playlist metadata
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch playlist metadata
  const fetchPlaylistMetadata = async () => {
    const url =
      "https://spotify-scraper.p.rapidapi.com/v1/playlist/metadata?playlistId=5782GLkrpvN8zbJQRjMaSW";
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

      console.log(result); // Log the structure of the result object
      setPlaylist(result); // Store the entire playlist metadata
    } catch (error) {
      console.error("Error fetching playlist metadata:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPlaylistMetadata();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading playlist...</p>;
  }

  if (!playlist) {
    return <p className="text-gray-400">Failed to load playlist.</p>;
  }

  // Function to handle playing the playlist
  const playPlaylist = () => {
    window.open(playlist.shareUrl, "_blank"); // Open the Spotify playlist in a new tab
  };

  return (
    <div className="bg-gray-900 text-white h-auto p-4 rounded-md">
      {/* Sidebar header with Spotify icon */}
      <div className="flex items-center mb-4">
        <FaSpotify size={30} className="mr-2" />
        <h1 className="text-xl font-bold">Your Library</h1>
      </div>

      {/* Card-like playlist display */}
      <div
        className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-300"
        onClick={playPlaylist} // Plays the playlist when clicked
      >
        {/* Display playlist cover image */}
        {playlist.images?.[0]?.[0]?.url && (
          <img
            src={playlist.images[0][0].url}
            alt="Playlist Cover"
            className="rounded mb-4"
            width={200}
          />
        )}

        {/* Playlist name */}
        <h2 className="text-xl font-bold text-green-500 mb-2">
          {playlist.name}
        </h2>

        {/* Playlist owner */}
        <p className="text-gray-400 mb-2">
          Playlist • {playlist.owner?.name || "Unknown Owner"}
        </p>

        {/* Playlist follower count */}
        <p className="text-gray-500">
          Followers: {playlist.followerCount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
