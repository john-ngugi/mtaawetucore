import { useEffect, useState, useRef } from "react";
import maplibregl, { ScaleControl } from "maplibre-gl";
import BasemapControl from 'maplibre-basemaps';
import "maplibre-gl/dist/maplibre-gl.css";
import { useNavigate } from "react-router-dom";
import { get_reports, logout,get_all_reports} from "../endpoints/api";
import BottomSlidePanel from "../components/BottomSlidePanel";
import Header from "../components/Header";
import { useAuth } from "../context/useAuth";
// import LayerControl from "../components/LayerControl";
import AnimatedMarker from "../components/AnimatedMarker"; // Import the new marker component
import DialogueInstractions from "../components/DialogueInstructions";
import axios from "axios";
import {GET_USER_INFO} from "../endpoints/api"
const LandingPage = () => {
  // const MAPTILER_KEY = "Zk2vXxVka5bwTvXQmJ0l";
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLng, setSelectedLng] = useState<number | null>(null);
  const [isVisible, setIsPanelVisible] = useState(false);
  const [isSuperUser, setSuperUser] =  useState(false);
  const { username } = useAuth();
  
  // const storedStaffStatus = localStorage.getItem("staffStatus");
  const nav = useNavigate();

  // const mapStyles = {
  //   Streets: `https://api.maptiler.com/maps/openstreetmap/style.json?key=${MAPTILER_KEY}`,
  //   Satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
  //   Light: `https://api.maptiler.com/maps/streets-v2-light/style.json?key=${MAPTILER_KEY}`,
  //   Dark: `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${MAPTILER_KEY}`,
  //   three_D: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`
  // };
  const googleMaps= {
    name: "Google Maps",
    tiles: ['https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'],
    maxzoom: 13,
    minZoom:9,
    attribution: 'Tiles &copy; Google',
}
  const osm = {
    name: "Open Street Map",
    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
    maxzoom: 18,
    attribution: 'osm'
}
const osmCycle = {
    name: "OSM Cycle",
    tiles: ['https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'],
}

const baseLayers = {
    osm,
    osmCycle,
    googleMaps,
}


  useEffect(() => {
    
    const getUserStatus = async () => {
    const userInfo = GET_USER_INFO()
    const response = axios.post(userInfo, { withCredentials: true , username:username});
    return response;
    }

    const fetchReports = async () => { 
        const userData = await getUserStatus()
        console.log("UserData",userData);
        setSuperUser(userData.data.user_info.is_superuser === true)
        if(userData.data.user_info.is_superuser === true){
          const reports = await get_all_reports();
          localStorage.setItem("userReports", JSON.stringify(reports));
        }else{
          const reports = await get_reports();
          localStorage.setItem("userReports", JSON.stringify(reports));
        }
    };
    fetchReports();
  }, []);

  const handleLogOut = async () => {
    const success = await logout();
    if (success) {
      nav("/login");
    }
  };

  // const updateMapStyle = (styleName: string) => {
  //   if (mapRef.current) {
  //     const selectedStyle =
  //       mapStyles[styleName as keyof typeof mapStyles] || mapStyles.Streets;
  //     mapRef.current.setStyle(selectedStyle);
  //   }
  // };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove(); // Remove the old map if it exists
    }

    const map = new maplibregl.Map({
      // style: mapStyles["Streets"], // Default style
      center: [34.7716, -0.6764], // Coordinates for Nairobi, Kenya
      zoom: 15.5,
      // pitch: 60,
      // bearing: -17.6,
      container: "map",
      antialias: true,
      maxZoom:22,
      minZoom:9,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");
    const basemapControl = new BasemapControl({ basemaps: baseLayers, initialBasemap: "googleMaps"});
    map.addControl(basemapControl, 'bottom-right');
    const scale = new ScaleControl({
      maxWidth: 80,
      unit: "metric",
    });
    map.addControl(scale);

    const addMarkerOnClick = (e: maplibregl.MapMouseEvent) => {
      const coordinates = e.lngLat;
      const coodinatesLat = parseFloat(coordinates.lat.toFixed(4));
      const coodinatesLng = parseFloat(coordinates.lng.toFixed(4));
      setSelectedLat(coodinatesLat);
      setSelectedLng(coodinatesLng);
      setIsPanelVisible(true);
      map.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: 17.2,
        speed: 0.4,
      });
    };

    map.on("click", addMarkerOnClick);

    return () => {
      if (map.getLayer("marker")) {
        map.removeLayer("marker");
      }
      if (map.getSource("marker-source")) {
        map.removeSource("marker-source");
      }
      if (map.hasImage("pulsing-dot")) {
        map.removeImage("pulsing-dot");
      }
      map.off("click", addMarkerOnClick);
      map.remove(); // Clean up map on unmount
      mapRef.current = null;
    };
  }, []); // Empty dependency to only run on mount
  // Empty dependency to only run on mount

  const flyTo = (lon: string, lat: string) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [parseFloat(lon), parseFloat(lat)],
        essential: true,
        zoom: 16.5,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen z-30">
      {/* Header Section */}
      <Header flyTo={flyTo} handleLogout={handleLogOut} username={username} isSuperUser={isSuperUser} />

      {/* Map Section */}
      <div className="w-screen h-full absolute">
        <div id="map" className="w-full h-full" />
      </div>
      <DialogueInstractions username={username} />
      {/* <div className="w-full flex justify-end ">
        <div className="w-1/2 md:w-1/4 mr-2">
          
          <LayerControl onClick={updateMapStyle} />
        </div>
      </div> */}

      {/* Animated Marker */}
      {/* Render AnimatedMarker only if coordinates are selected and not in satellite view */}
      {selectedLat !== null &&
        selectedLng !== null &&
        mapRef.current?.getStyle().name !== "Satellite" && (
          <AnimatedMarker
            map={mapRef.current}
            coordinates={[selectedLng, selectedLat]} // Pass coordinates in [lng, lat] order
          />
        )}

      {/* Bottom slide panel for additional information */}
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
