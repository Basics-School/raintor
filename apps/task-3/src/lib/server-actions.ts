import { User } from "../store/userStore";

export interface ServerApiResponse {
  users: User[];
  totalCount: number;
  hasNextPage: boolean;
  currentPage: number;
}

interface ApiData {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://tech-test.raintor.com/api/users";

export async function fetchUsersServerSide(
  take: number = 10,
  skip: number = 0
): Promise<ServerApiResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/GetUsersList?take=${take}&skip=${skip}`,
      {
        // Add cache control for better performance
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiData = await response.json();
    const currentPage = Math.floor(skip / take) + 1;

    return {
      users: data.users || [],
      totalCount: data.total || 0,
      hasNextPage: data.users.length === take && skip + take < data.total,
      currentPage,
    };
  } catch (error) {
    console.error("Failed to fetch users server-side:", error);
    throw error;
  }
}

// Client-side action for additional loads (maintaining compatibility)
export async function fetchUsersClientSide(
  take: number = 10,
  skip: number = 0
): Promise<ServerApiResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/GetUsersList?take=${take}&skip=${skip}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiData = await response.json();
    const currentPage = Math.floor(skip / take) + 1;

    return {
      users: data.users || [],
      totalCount: data.total || 0,
      hasNextPage: data.users.length === take && skip + take < data.total,
      currentPage,
    };
  } catch (error) {
    console.error("Failed to fetch users client-side:", error);
    throw error;
  }
}
