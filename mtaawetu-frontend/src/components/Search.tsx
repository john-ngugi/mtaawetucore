import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suggestions: any[];
  setSuggestions: (suggestions: any[]) => void;
  flyTo: (lon: string, lat: string) => void;
  fetchSuggestions: (input: string) => void;
}

const Search: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  setSuggestions,
  flyTo,
  fetchSuggestions,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      fetchSuggestions(value);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (lon: string, lat: string) => {
    flyTo(lon, lat);
    setIsVisible(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (suggestions.length > 0) {
        const topSuggestion = suggestions[0];
        handleSuggestionClick(topSuggestion.lon, topSuggestion.lat);
      } else {
        // Optional: If no suggestions are available, you can still trigger a search
        alert("Please select a location from the suggestions.");
      }
    }
  };

  return (
    <header className="bg-gray-900 p-4 shadow flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row w-full h-9">
        <input
          type="text"
          placeholder="Find Location"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Handle Enter key press
          className="text-gray-400 w-full sm:w-72 md:w-96 mb-2 sm:mb-0 sm:mr-3 px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {isVisible && suggestions.length > 0 && (
        <div className="fixed h-auto mt-11 md:mt-10 z-50 w-80 md:w-96 text-black bg-white shadow-md">
          {suggestions.map((location) => (
            <div
              key={location.place_id}
              className="w-full hover:bg-gray-50 h-auto flex flex-col justify-center cursor-pointer z-20"
              onClick={() => handleSuggestionClick(location.lon, location.lat)}
            >
              <h1 className="ps-4">{location.display_name}</h1>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Search;
