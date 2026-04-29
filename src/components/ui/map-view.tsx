"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Fix for missing marker icons in leaflet with next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  coordinates?: number[];
}

interface MapViewProps {
  locations: Location[];
}

export default function MapView({ locations }: MapViewProps) {
  useEffect(() => {
    // Reset map size when rendered
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, []);

  const validLocations = locations.filter(loc => loc.coordinates && loc.coordinates.length === 2);
  
  // Center on Ayacucho Plaza by default
  const center = [-13.160126, -74.225575];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-zinc-800 z-0 relative isolate">
      <MapContainer 
        center={center as [number, number]} 
        zoom={11} 
        scrollWheelZoom={true} 
        className="w-full h-full z-0"
        style={{ background: "#09090b" }} // zinc-950
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {validLocations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={loc.coordinates as [number, number]}
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <div className="w-48 overflow-hidden rounded-lg bg-zinc-950 text-white border-zinc-800">
                <div 
                  className="h-24 w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${loc.image})` }}
                />
                <div className="p-3">
                  <span className="text-[10px] uppercase font-bold text-primary">{loc.category}</span>
                  <h4 className="font-bold text-sm mb-1">{loc.name}</h4>
                  <p className="text-xs text-zinc-400 mb-2 line-clamp-2">{loc.description}</p>
                  <Button size="sm" className="w-full h-8 text-xs rounded-md" asChild>
                    <Link href={`/destinos`}>Ver Destino</Link>
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          padding: 0;
          background: #09090b;
          border: 1px solid #27272a;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .leaflet-popup-tip {
          background: #09090b;
          border: 1px solid #27272a;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: white;
          padding: 8px 8px 0 0;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
