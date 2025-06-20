"use client";

import { useEffect, useCallback, useState } from "react";
import { useQueryState, parseAsBoolean, parseAsInteger } from "nuqs";
import { FixedSizeList as List } from "react-window";
import { useUserStore } from "../store/userStore";
import { userService } from "../services/userService";
import { UserCard } from "../components/UserCard";
import { UserCardSkeleton } from "../components/UserCardSkeleton";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { ServerApiResponse } from "../lib/server-actions";

const ITEMS_PER_PAGE = 10;
const ITEM_HEIGHT = 400;

interface UserDirectoryContentProps {
    initialData: ServerApiResponse;
    initialParams: {
        page: number;
        limit: number;
        useVirtualization: boolean;
    };
    serverError: string | null;
}

export function UserDirectoryContent({
    initialData,
    initialParams,
    serverError
}: UserDirectoryContentProps) {
    // URL state management with nuqs
    const [useVirtualization, setUseVirtualization] = useQueryState(
        "virtualization",
        parseAsBoolean.withDefault(initialParams.useVirtualization)
    );
    const [pageParam, setPageParam] = useQueryState(
        "page",
        parseAsInteger.withDefault(initialParams.page)
    );
    const [limitParam, setLimitParam] = useQueryState(
        "limit",
        parseAsInteger.withDefault(initialParams.limit)
    );

    const {
        users,
        isLoading,
        hasError,
        errorMessage,
        hasNextPage,
        currentPage,
        setUsers,
        addUsers,
        setLoading,
        setError,
        clearError,
        setHasNextPage,
        incrementPage,
        resetPagination,
        setTotalCount,
    } = useUserStore();

    const [listHeight, setListHeight] = useState(600);
    const [virtualizationError, setVirtualizationError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize store with server-side data
    useEffect(() => {
        if (!isInitialized) {
            if (serverError) {
                setError(serverError);
            } else {
                setUsers(initialData.users);
                setHasNextPage(initialData.hasNextPage);
                setTotalCount(initialData.totalCount);
                // Set the current page to match the server-side page
                resetPagination();
                for (let i = 1; i < initialParams.page; i++) {
                    incrementPage();
                }
                clearError();
            }
            setIsInitialized(true);
        }
    }, [
        isInitialized,
        initialData,
        serverError,
        setUsers,
        setHasNextPage,
        setTotalCount,
        setError,
        clearError,
        resetPagination,
        incrementPage,
        initialParams.page,
    ]);

    // Load additional data when parameters change (but not on initial load)
    useEffect(() => {
        if (isInitialized && limitParam !== initialParams.limit) {
            loadUsers(true);
        }
    }, [limitParam, isInitialized, initialParams.limit]);

    // Update list height based on window size
    useEffect(() => {
        const updateHeight = () => {
            setListHeight(window.innerHeight - 200);
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const loadUsers = async (isInitialLoad = false) => {
        if (isLoading) return;

        try {
            setLoading(true);
            clearError();
            setVirtualizationError(null);

            const skip = isInitialLoad ? 0 : (currentPage + 1) * limitParam;
            const response = await userService.getUsers(limitParam, skip);

            if (isInitialLoad) {
                setUsers(response.users);
                resetPagination();
                setPageParam(1);
            } else {
                addUsers(response.users);
                incrementPage();
                setPageParam(currentPage + 2); // +2 because incrementPage hasn't updated the state yet
            }

            setHasNextPage(response.hasNextPage);
            setTotalCount(response.totalCount);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = useCallback(() => {
        if (!isLoading && hasNextPage && !hasError) {
            loadUsers(false);
        }
    }, [isLoading, hasNextPage, hasError]);

    const { loadingElementRef } = useInfiniteScroll({
        hasNextPage,
        isLoading,
        onLoadMore: handleLoadMore,
    });

    const handleRetry = () => {
        clearError();
        loadUsers(true);
    };

    const handleRefresh = () => {
        resetPagination();
        loadUsers(true);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "r" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                handleRefresh();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Virtualized list item renderer with error handling
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        try {
            const user = users[index];

            if (!user) {
                return <UserCardSkeleton style={style} />;
            }

            return <UserCard key={user.id} user={user} style={style} />;
        } catch (error) {
            console.error("Error rendering row:", error);
            setVirtualizationError("Error rendering user card");
            return (
                <div style={style} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg m-2">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                        Error loading user data
                    </p>
                </div>
            );
        }
    };

    // Regular grid renderer for comparison
    const renderGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}

            {/* Loading skeletons */}
            {isLoading && (
                <>
                    {Array.from({ length: limitParam }).map((_, index) => (
                        <UserCardSkeleton key={`skeleton-${index}`} />
                    ))}
                </>
            )}
        </div>
    );

    if (hasError) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {errorMessage}
                    </p>
                    <button
                        onClick={handleRetry}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            User Directory
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 dark:text-gray-400">
                                    Items per page:
                                </label>
                                <select
                                    value={limitParam}
                                    onChange={(e) => setLimitParam(parseInt(e.target.value))}
                                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={useVirtualization}
                                    onChange={(e) => {
                                        setUseVirtualization(e.target.checked);
                                        setVirtualizationError(null); // Clear errors when toggling
                                    }}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Use Virtualization
                                </span>
                            </label>
                            <button
                                onClick={handleRefresh}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors text-sm"
                            >
                                {isLoading ? "Loading..." : "Refresh"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Total users: {users.length}</span>
                        <span>•</span>
                        <span>Page: {pageParam}</span>
                        <span>•</span>
                        <span>Items per page: {limitParam}</span>
                        <span>•</span>
                        <span className={isLoading ? "text-blue-600" : ""}>
                            {isLoading ? "Loading..." : "Ready"}
                        </span>
                        {hasNextPage && (
                            <>
                                <span>•</span>
                                <span>More available</span>
                            </>
                        )}
                    </div>

                    {virtualizationError && (
                        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                            <p className="text-red-600 dark:text-red-400 text-sm">
                                ⚠️ Virtualization Error: {virtualizationError}
                            </p>
                            <button
                                onClick={() => {
                                    setVirtualizationError(null);
                                    setUseVirtualization(false);
                                }}
                                className="mt-1 text-xs text-red-700 dark:text-red-300 hover:underline"
                            >
                                Switch to grid view
                            </button>
                        </div>
                    )}

                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Press Ctrl+R (Cmd+R) to refresh • Scroll to load more • URL parameters: ?virtualization=true&page=1&limit=10
                    </p>
                </header>

                {users.length === 0 && isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Loading users...
                        </p>
                    </div>
                ) : (
                    <>
                        {useVirtualization ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="font-medium text-gray-900 dark:text-white">
                                        Virtualized List ({users.length} items)
                                    </h2>
                                </div>
                                <div className="p-4">
                                    {virtualizationError ? (
                                        <div className="text-center py-8">
                                            <div className="text-red-500 text-4xl mb-2">⚠️</div>
                                            <p className="text-red-600 dark:text-red-400 mb-4">
                                                Virtualization failed to render properly
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setVirtualizationError(null);
                                                    setUseVirtualization(false);
                                                }}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm"
                                            >
                                                Switch to Grid View
                                            </button>
                                        </div>
                                    ) : (
                                        <List
                                            height={listHeight}
                                            itemCount={users.length + (isLoading ? limitParam : 0)}
                                            itemSize={ITEM_HEIGHT}
                                            width="100%"
                                            onItemsRendered={({ overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex }) => {
                                                // Optional: Handle visible range for analytics or performance monitoring
                                                console.debug("Visible range:", { visibleStartIndex, visibleStopIndex });
                                            }}
                                        >
                                            {Row}
                                        </List>
                                    )}
                                </div>
                            </div>
                        ) : (
                            renderGrid()
                        )}

                        {/* Infinite scroll trigger */}
                        <div
                            ref={loadingElementRef}
                            className="h-10 flex items-center justify-center mt-8"
                        >
                            {isLoading && hasNextPage && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                    Loading more users...
                                </div>
                            )}
                            {!hasNextPage && users.length > 0 && (
                                <p className="text-gray-500 dark:text-gray-500 text-sm">
                                    No more users to load
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
