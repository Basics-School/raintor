import { Suspense } from "react";
import { UserDirectoryContent } from "../components/UserDirectoryContent";
import { fetchUsersServerSide } from "../lib/server-actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
    // Await search params
    const params = await searchParams;

    // Parse search params with defaults
    const page = parseInt((params.page as string) || "1", 10);
    const limit = parseInt((params.limit as string) || "10", 10);
    const useVirtualization = (params.virtualization as string) === "true";

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch initial data on server side
    let initialData;
    let error = null;

    try {
        initialData = await fetchUsersServerSide(limit, skip);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load users";
        // Provide fallback data structure
        initialData = {
            users: [],
            totalCount: 0,
            hasNextPage: false,
            currentPage: page,
        };
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Loading user directory...
                    </p>
                </div>
            </div>
        }>
            <UserDirectoryContent
                initialData={initialData}
                initialParams={{
                    page,
                    limit,
                    useVirtualization
                }}
                serverError={error}
            />
        </Suspense>
    );
}
