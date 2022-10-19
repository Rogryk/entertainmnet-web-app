import React, { useState } from "react";

interface IrequestConfig {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: any;
}

const useHttp = (requestConfig: IrequestConfig, applyData: any) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);
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
      applyData(data);
    } catch (err) {
      setError("Something went wrong");
    }
    setIsLoading(false);
  };

  return { isLoading, error, sendRequest };
};

export default useHttp;
