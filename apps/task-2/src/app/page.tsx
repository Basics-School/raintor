"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSignalR } from "../hooks/useSignalR";

const MapComponent = dynamic(
    () => import("../components/MapComponent").then((mod) => ({ default: mod.MapComponent })),
    { ssr: false, loading: () => <div className="h-96 lg:h-[600px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">Loading map...</div> }
);

export default function Home() {
    const { isConnected, locations, sendLocation } = useSignalR();
    const [userMode, setUserMode] = useState<"sender" | "receiver">("sender");
    const [userName, setUserName] = useState("Default");
    const [currentLat, setCurrentLat] = useState(25.73736464);
    const [currentLon, setCurrentLon] = useState(90.3644747);

    const handleSendLocation = () => {
        sendLocation(currentLat, currentLon, userName);
    };

    const handleMapClick = (lat: number, lon: number) => {
        if (userMode === "sender") {
            setCurrentLat(lat);
            setCurrentLon(lon);
        }
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLat(position.coords.latitude);
                    setCurrentLon(position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to get your location. Please check permissions.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Real-time Location Sharing
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${isConnected
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}>
                            {isConnected ? "Connected" : "Disconnected"}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Active locations: {locations.length}
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Control Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Mode Selection */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                User Mode
                            </h2>
                            <div className="space-y-3">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="userMode"
                                        value="sender"
                                        checked={userMode === "sender"}
                                        onChange={(e) => setUserMode(e.target.value as "sender" | "receiver")}
                                        className="mr-3"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        User A (Send Location)
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="userMode"
                                        value="receiver"
                                        checked={userMode === "receiver"}
                                        onChange={(e) => setUserMode(e.target.value as "sender" | "receiver")}
                                        className="mr-3"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        User B (Receive Location)
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Sender Controls */}
                        {userMode === "sender" && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Send Location
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Latitude
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                value={currentLat}
                                                onChange={(e) => setCurrentLat(Number(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Longitude
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                value={currentLon}
                                                onChange={(e) => setCurrentLon(Number(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <button
                                            onClick={handleGetCurrentLocation}
                                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                                        >
                                            Use My Current Location
                                        </button>
                                        <button
                                            onClick={handleSendLocation}
                                            disabled={!isConnected}
                                            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
                                        >
                                            Send Location
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Tip: Click on the map to set coordinates
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Active Locations */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Active Locations
                            </h2>
                            {locations.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    No locations received yet
                                </p>
                            ) : (
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {locations.map((location, index) => (
                                        <div
                                            key={`${location.userName}-${index}`}
                                            className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                                        >
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {location.userName}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-full">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Location Map
                            </h2>
                            <div className="h-96 lg:h-[600px]">
                                <MapComponent
                                    locations={locations}
                                    onLocationClick={userMode === "sender" ? handleMapClick : undefined}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
