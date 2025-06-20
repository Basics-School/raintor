import { User } from "../store/userStore";

export interface ApiResponse {
  users: User[];
  totalCount: number;
  hasNextPage: boolean;
}

const BASE_URL = "https://tech-test.raintor.com/api/users";

export const userService = {
  async getUsers(take: number = 10, skip: number = 0): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/GetUsersList?take=${take}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        users: data || [],
        totalCount: data.length || 0,
        hasNextPage: data.length === take, // If we got exactly what we asked for, there might be more
      };
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  },
};
