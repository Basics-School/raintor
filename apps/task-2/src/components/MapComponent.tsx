"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocationData } from "../hooks/useSignalR";

interface MapComponentProps {
    locations: LocationData[];
    onLocationClick?: (lat: number, lon: number) => void;
    currentUserLocation?: { lat: number; lon: number; userName: string };
}

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create custom icon for current user location
const currentUserIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const MapComponent = ({ locations, onLocationClick, currentUserLocation }: MapComponentProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<{ [key: string]: L.Marker }>({});
    const currentUserMarkerRef = useRef<L.Marker | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        // Initialize map
        const map = L.map(mapContainerRef.current).setView([25.73736464, 90.3644747], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        if (onLocationClick) {
            map.on("click", (e) => {
                const { lat, lng } = e.latlng;
                onLocationClick(lat, lng);
            });
        }

        mapRef.current = map;

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [onLocationClick]);

    // Handle current user location marker
    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        if (currentUserLocation) {
            const { lat, lon, userName } = currentUserLocation;

            if (currentUserMarkerRef.current) {
                // Update existing current user marker
                currentUserMarkerRef.current.setLatLng([lat, lon]);
                currentUserMarkerRef.current.setPopupContent(`${userName} (You): ${lat.toFixed(6)}, ${lon.toFixed(6)}`);
            } else {
                // Create new current user marker
                const marker = L.marker([lat, lon], { icon: currentUserIcon })
                    .addTo(map)
                    .bindPopup(`${userName} (You): ${lat.toFixed(6)}, ${lon.toFixed(6)}`);

                currentUserMarkerRef.current = marker;
            }
        } else if (currentUserMarkerRef.current) {
            // Remove current user marker if no location
            map.removeLayer(currentUserMarkerRef.current);
            currentUserMarkerRef.current = null;
        }
    }, [currentUserLocation]);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;
        const currentMarkers = markersRef.current;

        // Remove markers that no longer exist
        Object.keys(currentMarkers).forEach(userName => {
            if (!locations.find(loc => loc.userName === userName)) {
                map.removeLayer(currentMarkers[userName]);
                delete currentMarkers[userName];
            }
        });

        // Add or update markers
        locations.forEach(location => {
            const { userName, lat, lon } = location;

            if (currentMarkers[userName]) {
                // Update existing marker
                currentMarkers[userName].setLatLng([lat, lon]);
            } else {
                // Create new marker
                const marker = L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(`${userName}: ${lat.toFixed(6)}, ${lon.toFixed(6)}`);

                currentMarkers[userName] = marker;
            }
        });

        // Center map on latest location if exists
        if (locations.length > 0) {
            const latest = locations[locations.length - 1];
            map.setView([latest.lat, latest.lon], map.getZoom());
        }
    }, [locations]);

    return (
        <div
            ref={mapContainerRef}
            className="w-full h-full min-h-[400px] rounded-lg border border-gray-200 dark:border-gray-700"
            style={{ zIndex: 1 }}
        />
    );
};
