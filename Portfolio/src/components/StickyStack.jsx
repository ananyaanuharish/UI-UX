import { Children } from "react";
import { useReducedMotion } from "framer-motion";

// Sticky scroll-stacking cards (CodePen/Awwwards classic). Each child pins
// near the top as you scroll; the next card scrolls up and overlaps it, with
// a small incremental top offset so a sliver of each stays visible. Falls
// back to a normal stacked column for prefers-reduced-motion.
//
// Uses React.Children.toArray so keys come from each child's own key (Bento
// supplies key={t.title}), not from the map index — safe for any future
// filtering or reordering caller.
export default function StickyStack({ children, className = "" }) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  if (reduce) {
    return <div className={`flex flex-col gap-6 ${className}`}>{items}</div>;
  }

  return (
    <div className={className}>
      {items.map((child, i) => (
        // key comes from child.key (assigned by Children.toArray from the
        // source element's own key prop), not from the index.
        <div
          key={child.key}
          className="sticky"
          style={{
            top: `calc(6rem + ${i * 1.5}rem)`,
            marginBottom: i === items.length - 1 ? 0 : "2rem",
            zIndex: i + 1,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
