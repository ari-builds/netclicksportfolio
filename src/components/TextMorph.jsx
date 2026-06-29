import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useId } from "react";

export function TextMorph({ children, as: Component = "p", className, style }) {
  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts = {};
    return children.split("").map((char) => {
      const normalized = char === " " ? "\u00A0" : char;
      const lowerChar = normalized.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;
      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: normalized,
      };
    });
  }, [children, uniqueId]);

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode="wait" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.06 } }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="inline-block"
            aria-hidden="true"
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
