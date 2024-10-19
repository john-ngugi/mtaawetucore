import { useState } from "react";
import Search from "./Search";
import { Menu, X } from "lucide-react"; // Import X icon for close
import { FaFileAlt, FaUserCog } from "react-icons/fa"; // Icons for the menu
import { useNavigate } from "react-router-dom";
interface Suggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface HeaderProps {
  flyTo: (lon: string, lat: string) => void;
  handleLogout: () => void;
  username: string;
}

function Header({ flyTo, handleLogout, username }: HeaderProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu open/close state

  const nav = useNavigate();
  // Toggle the slide-in menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchSuggestions = async (input: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${input}, Kenya`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleReports = () => {
    nav("/reports");
  };
  // Function to get initials from the username
  const getInitials = (name: string) => {
    const initials = name.split(" ");
    return initials.length > 1
      ? initials[0][0] + initials[1][0] // Take the first letter of the first two words
      : initials[0][0]; // Handle case with a single name
  };
  return (
    <>
      {/* Header Section */}
      <div className="w-screen h-1/4 relative z-10 bg-gray-900 text-white flex flex-row justify-between">
        <div className="w-80">
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            flyTo={flyTo}
            fetchSuggestions={fetchSuggestions}
          />
        </div>
        {/* Button to open menu */}
        <div className="flex flex-col justify-center align-middle p-2 ">
          <button onClick={toggleMenu}>
            <Menu size={30} />
          </button>
        </div>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        {/* Menu Content */}
        <div className="flex flex-col h-full">
          {/* Profile Section with Close Button */}
          <div className="flex items-center justify-between p-4 bg-gray-800">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {getInitials(username)}
                </span>{" "}
                {/* Initials */}
              </div>
              <span className="ml-3 text-lg font-semibold">{username}</span>
            </div>
            {/* Close Button */}
            <button onClick={toggleMenu}>
              <X size={24} className="text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow p-4">
            {/* <a href="#" className="flex items-center p-2 hover:bg-gray-700">
              <FaTachometerAlt className="mr-2" /> Dashboard
            </a> */}
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700"
              onClick={handleReports}
            >
              <FaFileAlt className="mr-2" /> Reports
            </a>
            <a href="#" className="flex items-center p-2 hover:bg-gray-700">
              <FaUserCog className="mr-2" /> Account
            </a>
          </nav>

          {/* Logout Button */}
          <div className="p-4 bg-gray-800">
            <button
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
