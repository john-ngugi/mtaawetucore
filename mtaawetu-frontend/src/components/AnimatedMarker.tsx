import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";

interface AnimatedMarkerProps {
  map: maplibregl.Map | null;
  coordinates: [number, number]; // [lng, lat]
}

const AnimatedMarker: React.FC<AnimatedMarkerProps> = ({
  map,
  coordinates,
}) => {
  const pulsingDot = {
    width: 200,
    height: 200,
    context: null as CanvasRenderingContext2D | null,
    data: new Uint8ClampedArray(200 * 200 * 4),

    onAdd() {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },

    render() {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (this.width / 2) * 0.3;
      const outerRadius = (this.width / 2) * 0.7 * t + radius;

      const context = this.context;
      if (!context) return false;

      context.clearRect(0, 0, this.width, this.height);

      // Draw outer circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
      context.fill();

      // Draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 100, 100, 1)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      this.data = context.getImageData(0, 0, this.width, this.height).data;

      map?.triggerRepaint();

      return true;
    },
  };
  useEffect(() => {
    if (map) {
      // Check if the image is already added
      if (!map.hasImage("pulsing-dot")) {
        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
      }

      // Check and remove existing layer and source
      if (map.getLayer("marker")) {
        map.removeLayer("marker");
      }

      if (map.getSource("marker-source")) {
        map.removeSource("marker-source");
      }

      // Add the new source
      map.addSource("marker-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates, // Your coordinates here
              },
              properties: {},
            },
          ],
        },
      });

      // Add the new layer
      map.addLayer({
        id: "marker",
        type: "symbol",
        source: "marker-source",
        layout: {
          "icon-image": "pulsing-dot",
        },
      });
    }

    return () => {
      if (map && map.getStyle()) {
        // Check if the map instance still exists
        // Cleanup on unmount
        if (map.getLayer("marker")) {
          map.removeLayer("marker");
        }
        if (map.getSource("marker-source")) {
          map.removeSource("marker-source");
        }
        if (map.hasImage("pulsing-dot")) {
          map.removeImage("pulsing-dot");
        }
      }
    };
  }, [map, coordinates]);

  return null; // This component does not render anything in the DOM
};

export default AnimatedMarker;
