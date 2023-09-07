import { useEffect, useState } from "react";

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const DELAY = 200;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, DELAY);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
