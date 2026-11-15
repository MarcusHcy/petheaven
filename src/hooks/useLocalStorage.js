// Works like useState, but the value is also saved in the browser (localStorage)
// so it is still there after a refresh. This is how we "store data" without a backend.
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // storage blocked or broken, just use the default
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // nothing to do if saving fails
    }
  }, [key, value]);

  return [value, setValue];
}
