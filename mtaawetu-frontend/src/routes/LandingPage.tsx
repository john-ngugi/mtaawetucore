import { useEffect, useState, useRef } from "react";
import maplibregl, { ScaleControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useNavigate } from "react-router-dom";
import { get_reports, logout } from "../endpoints/api";
import BottomSlidePanel from "../components/BottomSlidePanel";
import Header from "../components/Header";
import { useAuth } from "../context/useAuth";

// interface Report {
//   id: number; // Or 'number' if the ID is numeric
//   grivance_description: string;
//   category_of_complaint: string;
//   category_of_grivance: string;
//   status: string;
//   date: Date; // You can use Date instead if parsing the date
// }

const LandingPage = () => {
  // const [reports, setReports] = useState<Report[]>([]);
  const MAPTILER_KEY = "Zk2vXxVka5bwTvXQmJ0l";
  const mapRef = useRef<maplibregl.Map | null>(null); // Reference for the map instance
  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLng, setSelectedLng] = useState<number | null>(null);
  const [isVisible, setIsPanelVisible] = useState(false);
  const { username } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await get_reports();
      // setReports(reports_get);
      // Store reports in localStorage
      localStorage.setItem("userReports", JSON.stringify(reports));
    };
    fetchReports();
  }, []);

  const handleLogOut = async () => {
    const success = await logout();
    if (success) {
      nav("/login");
    }
  };

  //////////////////////////////////////MAP//////////////////

  // map functions

  // Function to add a popup on click event to the map
  function addPopupOnMapClick(map: maplibregl.Map) {
    // Listen for click events on the map
    map.on("click", (e) => {
      const coordinates = e.lngLat; // Get the clicked coordinates
      const coordinatelat = parseFloat(coordinates.lat.toFixed(4));
      const coordinatelng = parseFloat(coordinates.lng.toFixed(4));
      setSelectedLat(coordinatelat);
      setSelectedLng(coordinatelng);
      setIsPanelVisible(true);
      map.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: 19,
        speed: 0.4,
      });
      // Create a new popup and set its content and position
      // new maplibregl.Popup()
      //   .setLngLat([coordinates.lng, coordinates.lat]) // Set popup position
      //   .setHTML(popupHTML) // Set popup content
      //   .addTo(map); // Add the popup to the map
    });
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove(); // Remove the old map if it exists
    }

    // Initialize the map
    const map = new maplibregl.Map({
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
      center: [34.7716, -0.6764], // Coordinates for Nairobi, Kenya
      zoom: 15.5,
      pitch: 60,
      bearing: -17.6,
      container: "map", // Reference the map container div
      antialias: true,
    });

    mapRef.current = map; // Save the map instance to the ref

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    // Add scale control
    const scale = new ScaleControl({
      maxWidth: 80,
      unit: "metric",
    });
    map.addControl(scale); // Add the scale control to the map
    addPopupOnMapClick(map);
    return () => {
      map.remove(); // Clean up map on unmount
      mapRef.current = null;
    };
  }, []); // Empty dependency to only run on mount

  const flyTo = (lon: string, lat: string) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [parseFloat(lon), parseFloat(lat)], // Fly to the given coordinates
        essential: true,
        zoom: 15.5,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header flyTo={flyTo} handleLogout={handleLogOut} username={username} />

      {/* Map Section */}
      <div className="w-screen h-screen absolute">
        <div id="map" className="w-full h-full" />
      </div>
      <div id="map" className="w-full h-full" />
      <BottomSlidePanel
        lat={selectedLat}
        lng={selectedLng}
        onClose={() => setIsPanelVisible(false)}
        onLocationSelect={(lng, lat) =>
          console.log("Location selected:", lng, lat)
        }
        isVisible={isVisible}
      />
    </div>
  );
};

export default LandingPage;

/* {reports.map((report) => (
          <div key={report.id} className="mb-4">
            <ul>
              <li>Description: {report.givance_description}</li>
              <li>Latitude: {report.lat}</li>
              <li>Longitude: {report.lon}</li>
            </ul>
          </div>
        ))} */
