"use client";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";

export interface LocationData {
  userName: string;
  lat: number;
  lon: number;
}

export const useSignalR = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [isLocalMode, setIsLocalMode] = useState(false);
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://tech-test.raintor.com/Hub", {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .configureLogging(LogLevel.Information)
      .build();

    connectionRef.current = newConnection;

    const startConnection = async () => {
      try {
        setIsConnecting(true);
        setConnectionError(null);
        await newConnection.start();
        setConnection(newConnection);
        setIsConnected(true);
        setIsConnecting(false);
        setIsLocalMode(false);
        console.log("SignalR Connected");

        newConnection.on("ReceiveLatLon", (locationData: LocationData) => {
          console.log("Received location:", locationData);
          setLocations((prev) => {
            const filtered = prev.filter(
              (loc) => loc.userName !== locationData.userName
            );
            return [...filtered, locationData];
          });
        });

        newConnection.onclose(() => {
          setIsConnected(false);
          setConnection(null);
          console.log("SignalR Disconnected");
        });

        newConnection.onreconnecting(() => {
          setIsConnecting(true);
          setConnectionError(null);
          console.log("SignalR Reconnecting...");
        });

        newConnection.onreconnected(() => {
          setIsConnected(true);
          setIsConnecting(false);
          setConnectionError(null);
          console.log("SignalR Reconnected");
        });
      } catch (error) {
        console.error("SignalR Connection Error:", error);
        setIsConnected(false);
        setIsConnecting(false);

        // Check if it's a network/CORS error and enable local demo mode
        const errorMessage =
          error instanceof Error ? error.message : "Connection failed";
        if (
          errorMessage.includes("Failed to fetch") ||
          errorMessage.includes("NetworkError") ||
          errorMessage.includes("CORS")
        ) {
          setConnectionError(
            "SignalR hub unavailable - Running in demo mode. Location sharing will work locally only."
          );
          setIsLocalMode(true);
          setIsConnected(true); // Enable UI in demo mode

          // Add some demo locations for testing
          setLocations([
            { userName: "Demo User 1", lat: 25.7617, lon: 90.3649 },
            { userName: "Demo User 2", lat: 25.7317, lon: 90.4117 },
          ]);
        } else {
          setConnectionError(errorMessage);
        }
      }
    };

    startConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, []);

  const sendLocation = async (
    lat: number,
    lon: number,
    userName: string = "Default"
  ) => {
    if (isConnected) {
      try {
        setIsSending(true);

        if (isLocalMode) {
          // Demo mode - simulate sending and add to local locations
          console.log("Demo mode: Location sent locally:", {
            lat,
            lon,
            userName,
          });
          const locationData: LocationData = { lat, lon, userName };
          setLocations((prev) => {
            const filtered = prev.filter(
              (loc) => loc.userName !== locationData.userName
            );
            return [...filtered, locationData];
          });
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else if (connection) {
          await connection.invoke("SendLatLon", lat, lon, userName);
          console.log("Location sent:", { lat, lon, userName });
        } else {
          throw new Error("Connection not available");
        }
      } catch (error) {
        console.error("Failed to send location:", error);
        throw error;
      } finally {
        setIsSending(false);
      }
    } else {
      throw new Error("Not connected to location service");
    }
  };

  const reconnect = async () => {
    setIsLocalMode(false); // Reset local mode flag

    if (connectionRef.current) {
      try {
        setIsConnecting(true);
        setConnectionError(null);
        await connectionRef.current.stop();
        await connectionRef.current.start();
        setConnection(connectionRef.current);
        setIsConnected(true);
        setIsConnecting(false);
        console.log("Manual reconnection successful");
      } catch (error) {
        console.error("Manual reconnection failed:", error);
        setIsConnected(false);
        setIsConnecting(false);

        // Fallback to local mode if reconnection fails
        const errorMessage =
          error instanceof Error ? error.message : "Reconnection failed";
        if (
          errorMessage.includes("Failed to fetch") ||
          errorMessage.includes("NetworkError") ||
          errorMessage.includes("CORS")
        ) {
          setConnectionError(
            "SignalR hub unavailable - Running in demo mode. Location sharing will work locally only."
          );
          setIsLocalMode(true);
          setIsConnected(true); // Enable UI in demo mode

          // Add some demo locations for testing
          setLocations([
            { userName: "Demo User 1", lat: 25.7617, lon: 90.3649 },
            { userName: "Demo User 2", lat: 25.7317, lon: 90.4117 },
          ]);
        } else {
          setConnectionError(errorMessage);
        }
      }
    } else {
      // Try to create a new connection
      window.location.reload();
    }
  };

  return {
    connection,
    isConnected,
    isConnecting,
    isSending,
    connectionError,
    isLocalMode,
    locations,
    sendLocation,
    reconnect,
  };
};
