import React, { useState, useEffect } from "react";

const Album = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://spotify-scraper.p.rapidapi.com/v1/album/tracks?albumId=5Otajf16kZ0zkVZWhu7LtO";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ad85cc08a5msh86f530e72bd7811p1260abjsn53db6323e470",
          "x-rapidapi-host": "spotify-scraper.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.status && result.errorId === "Success") {
          setSections(result.sections.items); // Assuming result.sections.items is the correct path
          setLoading(false);
        } else {
          throw new Error("API response error");
        }
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading tracks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        sections.map((section) => (
          <div key={section.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {section.contents.items.map((item) => (
                <div key={item.id} className="text-center ">
                  {/* Check if item.visuals and item.visuals.avatar exist */}
                  {item.visuals &&
                  item.visuals.avatar &&
                  item.visuals.avatar.length > 0 ? (
                    <img
                      src={item.visuals.avatar[2].url} // Using the high-res image
                      alt={item.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-2"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <a
                    href={item.shareUrl}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Spotify
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Album;
