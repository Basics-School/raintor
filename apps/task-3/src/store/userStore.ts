import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
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
