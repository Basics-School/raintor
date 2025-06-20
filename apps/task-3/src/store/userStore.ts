import { create } from "zustand";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    addressLine: string | null;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      addressLine: string | null;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  hasNextPage: boolean;
  currentPage: number;
  totalCount: number;

  // Actions
  setUsers: (users: User[]) => void;
  addUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
  setHasNextPage: (hasNext: boolean) => void;
  incrementPage: () => void;
  resetPagination: () => void;
  setTotalCount: (count: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
  hasNextPage: true,
  currentPage: 0,
  totalCount: 0,

  setUsers: (users) => set({ users }),
  addUsers: (newUsers) =>
    set((state) => ({
      users: [...state.users, ...newUsers],
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (errorMessage) =>
    set({
      hasError: true,
      errorMessage,
      isLoading: false,
    }),
  clearError: () =>
    set({
      hasError: false,
      errorMessage: "",
    }),
  setHasNextPage: (hasNextPage) => set({ hasNextPage }),
  incrementPage: () =>
    set((state) => ({
      currentPage: state.currentPage + 1,
    })),
  resetPagination: () =>
    set({
      currentPage: 0,
      hasNextPage: true,
      users: [],
      hasError: false,
      errorMessage: "",
    }),
  setTotalCount: (totalCount) => set({ totalCount }),
}));
