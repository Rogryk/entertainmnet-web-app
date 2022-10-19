import React, { useState } from "react";

async function HttpRequestHandler(url: string, requestType?: "GET" | "POST") {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //TODO: error handling
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something is wrong");
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.log("Error: ", err);
    }
    setIsLoading(false);
  };
  console.log(data);

  return data;
}

export default HttpRequestHandler;
