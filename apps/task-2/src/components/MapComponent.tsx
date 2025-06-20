"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocationData } from "../hooks/useSignalR";

interface MapComponentProps {
    locations: LocationData[];
    onLocationClick?: (lat: number, lon: number) => void;
}

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export const MapComponent = ({ locations, onLocationClick }: MapComponentProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<{ [key: string]: L.Marker }>({});
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
