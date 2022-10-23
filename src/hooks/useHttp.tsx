import React, { useState, useCallback } from "react";

interface IrequestConfig {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: any;
}

const useHttp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (requestConfig: IrequestConfig, applyData?: any) => {
      // set isLoading only if there is any body content passed
      !requestConfig.body && setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        applyData && applyData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong.");
        } else {
          setError("Something went wrong.");
        }
      }
      setIsLoading(false);
    },
    []
  );

  return { isLoading, error, sendRequest };
};

export default useHttp;
