import { User } from "../store/userStore";
import { fetchUsersClientSide } from "../lib/server-actions";

export interface ApiResponse {
  users: User[];
  totalCount: number;
  hasNextPage: boolean;
}

export const userService = {
  async getUsers(take: number = 10, skip: number = 0): Promise<ApiResponse> {
    try {
      const response = await fetchUsersClientSide(take, skip);
      return {
        users: response.users,
        totalCount: response.totalCount,
        hasNextPage: response.hasNextPage,
      };
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  },
};
