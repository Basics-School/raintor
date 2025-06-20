"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isLoading,
  onLoadMore,
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingElementRef = useRef<HTMLDivElement | null>(null);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  const observe = useCallback(() => {
    if (loadingElementRef.current && hasNextPage && !isLoading) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            onLoadMore();
          }
        },
        {
          threshold,
          rootMargin: "200px",
        }
      );

      observerRef.current.observe(loadingElementRef.current);
    }
  }, [hasNextPage, isLoading, onLoadMore, threshold]);

  useEffect(() => {
    observe();
    return disconnect;
  }, [observe, disconnect]);

  useEffect(() => {
    disconnect();
    observe();
  }, [hasNextPage, isLoading, disconnect, observe]);

  return { loadingElementRef };
};
