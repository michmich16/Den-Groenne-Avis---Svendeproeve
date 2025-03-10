import { useEffect, useState } from "react";

export function useGet(url, token, param) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);

    fetch(url) //en helt normal fetching 
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [url, param]);

  return { data, error, isLoading };
}