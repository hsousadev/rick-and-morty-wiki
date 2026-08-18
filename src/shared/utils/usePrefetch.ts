import { useRouter } from "next/router";
import { useCallback } from "react";

export function usePrefetch(href?: string) {
  const router = useRouter();

  const prefetch = useCallback(() => {
    if (!href) return;
    router.prefetch(href);
  }, [href, router]);

  return {
    onMouseEnter: prefetch,
    onFocus: prefetch,
  };
}
