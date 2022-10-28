import { useEffect } from "react";

const useDebounce = (fun: () => {}, delay?: number) => {
  useEffect(() => {
    const timer = setTimeout(() => fun(), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [fun, delay]);
};

export default useDebounce;
