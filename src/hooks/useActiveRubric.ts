import { useState, useEffect, useCallback, useRef } from "react";

type RubricId = "1" | "2" | "3" | "4" | "5" | "6" | null;

interface UseActiveRubricOptions {
  /** Offset from top of viewport to trigger activation (default: 100px) */
  offset?: number;
  /** Selector prefix for rubric sections (default: 'rubric-') */
  selectorPrefix?: string;
  /** Debounce delay in ms (default: 50) */
  debounceMs?: number;
}

interface UseActiveRubricReturn {
  activeRubric: RubricId;
  activeItem: string | null;
  scrollToRubric: (rubricId: RubricId) => void;
  scrollToItem: (itemId: string) => void;
}

export const useActiveRubric = (
  options: UseActiveRubricOptions = {},
): UseActiveRubricReturn => {
  const { offset = 100, selectorPrefix = "rubric-", debounceMs = 50 } = options;

  const [activeRubric, setActiveRubric] = useState<RubricId>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const findActiveElements = useCallback(() => {
    const rubricIds: RubricId[] = ["1", "2", "3", "4", "5", "6"];
    let foundRubric: RubricId = null;
    let foundItem: string | null = null;
    let minDistance = Infinity;

    // Find the rubric closest to the top of the viewport
    for (const id of rubricIds) {
      const element = document.getElementById(`${selectorPrefix}${id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - offset);

        // Check if element is in viewport and closer than previous
        if (
          rect.top <= offset + 200 &&
          rect.bottom > offset &&
          distance < minDistance
        ) {
          minDistance = distance;
          foundRubric = id;
        }
      }
    }

    // Find the active item within the active rubric
    if (foundRubric) {
      const itemIds = ["1", "2", "3", "4"].map((i) => `${foundRubric}-${i}`);
      let itemMinDistance = Infinity;

      for (const itemId of itemIds) {
        const element = document.getElementById(`item-${itemId}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - offset);

          if (
            rect.top <= offset + 100 &&
            rect.bottom > offset &&
            distance < itemMinDistance
          ) {
            itemMinDistance = distance;
            foundItem = itemId;
          }
        }
      }
    }

    setActiveRubric(foundRubric);
    setActiveItem(foundItem);
  }, [offset, selectorPrefix]);

  const debouncedFindActive = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(findActiveElements, debounceMs);
  }, [findActiveElements, debounceMs]);

  useEffect(() => {
    // Initial check - use setTimeout to avoid cascading renders
    const initialTimeout = setTimeout(findActiveElements, 0);

    // Listen to scroll events
    window.addEventListener("scroll", debouncedFindActive, { passive: true });
    window.addEventListener("resize", debouncedFindActive, { passive: true });

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("scroll", debouncedFindActive);
      window.removeEventListener("resize", debouncedFindActive);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedFindActive, findActiveElements]);

  const scrollToRubric = useCallback(
    (rubricId: RubricId) => {
      if (!rubricId) return;
      const element = document.getElementById(`${selectorPrefix}${rubricId}`);
      if (element) {
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [offset, selectorPrefix],
  );

  const scrollToItem = useCallback(
    (itemId: string) => {
      const element = document.getElementById(`item-${itemId}`);
      if (element) {
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [offset],
  );

  return {
    activeRubric,
    activeItem,
    scrollToRubric,
    scrollToItem,
  };
};

export default useActiveRubric;
