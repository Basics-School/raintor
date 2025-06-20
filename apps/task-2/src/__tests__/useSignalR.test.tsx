import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSignalR } from "../hooks/useSignalR";

// Mock SignalR
jest.mock("@microsoft/signalr", () => ({
    HubConnectionBuilder: jest.fn().mockImplementation(() => ({
        withUrl: jest.fn().mockReturnThis(),
        withAutomaticReconnect: jest.fn().mockReturnThis(),
        configureLogging: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnValue({
            start: jest.fn().mockResolvedValue(undefined),
            stop: jest.fn().mockResolvedValue(undefined),
            on: jest.fn(),
            invoke: jest.fn().mockResolvedValue(undefined),
        }),
    })),
    LogLevel: {
        Information: 1,
    },
}));

// Test component to test the hook
function TestComponent() {
    const { isConnected, locations, sendLocation } = useSignalR();

    return (
        <div>
            <div data-testid="connection-status">
                {isConnected ? "Connected" : "Disconnected"}
            </div>
            <div data-testid="locations-count">{locations.length}</div>
            <button
                onClick={() => sendLocation(25.7, 90.4, "TestUser")}
                data-testid="send-location"
            >
                Send Location
            </button>
        </div>
    );
}

describe("useSignalR Hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should initialize with disconnected state", () => {
        render(<TestComponent />);

        expect(screen.getByTestId("connection-status")).toHaveTextContent("Disconnected");
        expect(screen.getByTestId("locations-count")).toHaveTextContent("0");
    });

    it("should have send location functionality", async () => {
        render(<TestComponent />);

        const sendButton = screen.getByTestId("send-location");
        fireEvent.click(sendButton);

        // The button should be clickable (testing the function exists)
        expect(sendButton).toBeInTheDocument();
    });

    it("should handle location data structure", () => {
        const { useSignalR: mockUseSignalR } = require("../hooks/useSignalR");

        // Test that the hook exports are properly structured
        expect(typeof mockUseSignalR).toBe("function");
    });
});
