"use client";

import { useEffect, useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useUserStore } from "../store/userStore";
import { userService } from "../services/userService";
import { UserCard } from "../components/UserCard";
import { UserCardSkeleton } from "../components/UserCardSkeleton";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const ITEMS_PER_PAGE = 10;
const ITEM_HEIGHT = 400;

export default function Home() {
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
    } = useUserStore();

    const [listHeight, setListHeight] = useState(600);
    const [useVirtualization, setUseVirtualization] = useState(true);

    // Load initial data
    useEffect(() => {
        loadUsers(true);
    }, []);

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

            const skip = isInitialLoad ? 0 : currentPage * ITEMS_PER_PAGE;
            const response = await userService.getUsers(ITEMS_PER_PAGE, skip);

            if (isInitialLoad) {
                setUsers(response.users);
                resetPagination();
            } else {
                addUsers(response.users);
                incrementPage();
            }

            setHasNextPage(response.hasNextPage);
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

    // Virtualized list item renderer
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const user = users[index];

        if (!user) {
            return <UserCardSkeleton style={style} />;
        }

        return <UserCard key={user.id} user={user} style={style} />;
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
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
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
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={useVirtualization}
                                    onChange={(e) => setUseVirtualization(e.target.checked)}
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

                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Press Ctrl+R (Cmd+R) to refresh • Scroll to load more
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
                                    <List
                                        height={listHeight}
                                        itemCount={users.length + (isLoading ? ITEMS_PER_PAGE : 0)}
                                        itemSize={ITEM_HEIGHT}
                                        width="100%"
                                    >
                                        {Row}
                                    </List>
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
