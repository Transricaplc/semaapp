import { useEffect, useState } from "react";
import {
  getAccessibilityModes,
  subscribeAccessibility,
  toggleAccessibilityMode,
  type AccessibilityMode,
} from "@/lib/accessibility";

export function useAccessibilityModes() {
  const [modes, setModes] = useState<AccessibilityMode[]>(() => getAccessibilityModes());

  useEffect(() => subscribeAccessibility(setModes), []);

  return {
    modes,
    isActive: (m: AccessibilityMode) => modes.includes(m),
    toggle: (m: AccessibilityMode) => setModes(toggleAccessibilityMode(m)),
  };
}
