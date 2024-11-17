import React from "react";

const SearchTab = ({ results }) => {
  return (
    <div className="bg-slate-800 text-white p-6 rounded-md w-11/12 h-auto">
      <div className="bg-slate-800 text-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {results.map((album, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg hover:bg-slate-700 transition duration-300"
            >
              {album.cover && album.cover.length > 0 ? (
                <img
                  src={album.cover[2]?.url || album.cover[0]?.url} // Prefer the largest image if available
                  alt={album.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-700 flex items-center justify-center rounded-md">
                  <span className="text-gray-400">No Cover Available</span>
                </div>
              )}
              <div className="mt-3">
                <h3 className="text-md font-semibold truncate">{album.name}</h3>
                <p className="text-sm text-gray-400">
                  {album.artists?.[0]?.name || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
