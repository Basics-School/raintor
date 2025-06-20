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
  const [locations, setLocations] = useState<LocationData[]>([]);
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://tech-test.raintor.com/Hub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connectionRef.current = newConnection;

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnection(newConnection);
        setIsConnected(true);
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
      } catch (error) {
        console.error("SignalR Connection Error:", error);
        setIsConnected(false);
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
    if (connection && isConnected) {
      try {
        await connection.invoke("SendLatLon", lat, lon, userName);
        console.log("Location sent:", { lat, lon, userName });
      } catch (error) {
        console.error("Failed to send location:", error);
      }
    }
  };

  return {
    connection,
    isConnected,
    locations,
    sendLocation,
  };
};
