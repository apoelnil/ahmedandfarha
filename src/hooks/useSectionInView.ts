import { useEffect, useRef, useState } from 'react';

export function useSectionInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation whenever entering viewport
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
        // Root is the viewport or scroll container
        root: null,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}
