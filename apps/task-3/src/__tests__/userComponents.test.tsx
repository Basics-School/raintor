import { render, screen, fireEvent } from "@testing-library/react";
import { useUserStore } from "../store/userStore";
import { UserCard } from "../components/UserCard";

// Mock user data
const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    website: "johndoe.com",
    company: {
        name: "Acme Corp",
        catchPhrase: "Innovative solutions",
        bs: "synergistic business solutions",
    },
    address: {
        street: "123 Main St",
        suite: "Apt 4",
        city: "Anytown",
        zipcode: "12345",
        geo: {
            lat: "40.7128",
            lng: "-74.0060",
        },
    },
};

describe("UserCard Component", () => {
    it("should render user information correctly", () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
        expect(screen.getByText("555-123-4567")).toBeInTheDocument();
        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    });

    it("should display user initials", () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should render company information", () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
        expect(screen.getByText('"Innovative solutions"')).toBeInTheDocument();
    });

    it("should render address information", () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
        expect(screen.getByText(/Anytown, 12345/)).toBeInTheDocument();
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
        addUsers([{ ...mockUser, id: 2, name: "Jane Doe" }]);

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
