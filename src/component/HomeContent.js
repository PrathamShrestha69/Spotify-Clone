import React, { useEffect, useState } from "react";

const HomeContent = () => {
  const [sections, setSections] = useState([]); // State to hold sections data
  const [loading, setLoading] = useState(true); // State to handle loading status

  const fetchContent = async () => {
    const url = "https://spotify-scraper.p.rapidapi.com/v1/home";
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
      setSections(result.sections.items); // Set sections to state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return <div>Loading content...</div>; // Display loading message
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {sections.map((section) => (
        <div key={section.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {section.contents.items.map((item) => (
              <div
                key={item.id}
                className="card group bg-gray-800 p-4 rounded-lg hover:shadow-lg hover:scale-105 transform transition duration-300"
              >
                <img
                  src={item.images?.[0]?.url || "fallback-image-url"}
                  alt={item.name}
                  className="rounded-lg mb-4 object-cover w-full h-40"
                />
                <h3 className="text-lg font-semibold text-white truncate">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  {item.description || "No description available"}
                </p>
                <a
                  href={item.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 mt-2 inline-block group-hover:underline"
                >
                  Listen on Spotify
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeContent;
