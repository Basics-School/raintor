import { User } from "../store/userStore";

export interface ApiResponse {
  users: User[];
  totalCount: number;
  hasNextPage: boolean;
}

interface ApiData {
  users: User[];
  total: number;
  skip: number;
  limit: number;
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

      const data: ApiData = await response.json();

      return {
        users: data.users || [],
        totalCount: data.total || 0,
        hasNextPage: data.users.length === take && skip + take < data.total,
      };
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  },
};
