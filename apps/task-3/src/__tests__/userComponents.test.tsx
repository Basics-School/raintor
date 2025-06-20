import { render, screen, fireEvent } from "@testing-library/react";
import { useUserStore } from "../store/userStore";
import { UserCard } from "../components/UserCard";

// Mock user data
const mockUser = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    maidenName: "",
    age: 28,
    gender: "male",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    username: "johnd",
    password: "johnpass",
    birthDate: "1996-5-30",
    image: "https://dummyjson.com/icon/johnd/128",
    bloodGroup: "O+",
    height: 180.5,
    weight: 75.2,
    eyeColor: "Blue",
    hair: {
        color: "Brown",
        type: "Straight"
    },
    ip: "192.168.1.1",
    address: {
        addressLine: null,
        city: "Anytown",
        state: "California",
        stateCode: "CA",
        postalCode: "12345",
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        },
        country: "United States"
    },
    macAddress: "00:B0:D0:63:C2:26",
    university: "Stanford University",
    bank: {
        cardExpire: "03/26",
        cardNumber: "1234567890123456",
        cardType: "Visa",
        currency: "USD",
        iban: "US123456789012345678"
    },
    company: {
        department: "Engineering",
        name: "Acme Corp",
        title: "Software Engineer",
        address: {
            addressLine: null,
            city: "San Francisco",
            state: "California",
            stateCode: "CA",
            postalCode: "94105",
            coordinates: {
                lat: 37.7749,
                lng: -122.4194
            },
            country: "United States"
        }
    },
    ein: "123-456",
    ssn: "123-45-6789",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    crypto: {
        coin: "Bitcoin",
        wallet: "0x1234567890abcdef",
        network: "Ethereum (ERC20)"
    },
    role: "admin"
};

describe("UserCard Component", () => {
    it("should render user information correctly", () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
        expect(screen.getByText("555-123-4567")).toBeInTheDocument();
        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    });

    it("should display user initials when no image", () => {
        const userWithoutImage = { ...mockUser, image: "" };
        render(<UserCard user={userWithoutImage} />);

        expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should render company information", () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
        expect(screen.getByText("Software Engineer • Engineering")).toBeInTheDocument();
    });

    it("should render address information", () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText(/Anytown, California 12345/)).toBeInTheDocument();
        expect(screen.getByText(/United States/)).toBeInTheDocument();
    });
});

describe("User Store", () => {
    it("should initialize with empty state", () => {
        const store = useUserStore.getState();

        expect(store.users).toEqual([]);
        expect(store.isLoading).toBe(false);
        expect(store.hasError).toBe(false);
        expect(store.currentPage).toBe(0);
    });

    it("should set users correctly", () => {
        const { setUsers } = useUserStore.getState();

        setUsers([mockUser]);

        const state = useUserStore.getState();
        expect(state.users).toHaveLength(1);
        expect(state.users[0]).toEqual(mockUser);
    });

    it("should add users to existing list", () => {
        const { setUsers, addUsers } = useUserStore.getState();

        setUsers([mockUser]);
        addUsers([{ ...mockUser, id: 2, firstName: "Jane", lastName: "Doe" }]);

        const state = useUserStore.getState();
        expect(state.users).toHaveLength(2);
    });

    it("should handle loading state", () => {
        const { setLoading } = useUserStore.getState();

        setLoading(true);
        expect(useUserStore.getState().isLoading).toBe(true);

        setLoading(false);
        expect(useUserStore.getState().isLoading).toBe(false);
    });
});
