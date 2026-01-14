// src/hooks/useFetch.ts
import { useState, useEffect, useRef } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const previousUrl = useRef<string>('');

  useEffect(() => {
    if (previousUrl.current === url) {
      return;
    }
    
    previousUrl.current = url;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          // Добавляем понятное описание к HTTP ошибкам === Add clear descriptions for HTTP errors
          throw new Error(`Request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Преобразуем технические ошибки в понятные сообщения === Transform technical errors into user-friendly messages (aditional user experience)
        let errorMessage = "Something broke, but we don't know what, so just in case, reinstall Windows.";
        
        if (err instanceof Error) {
          if (err.message.includes('Failed to fetch') || 
              err.message.includes('NetworkError')) {
            errorMessage = "Don't panic, you might not have internet. Check your network connection and router. If there's no internet at all, well, then it's time to panic!";
          } else if (err.message.includes('status 404')) {
            errorMessage = 'Oopsie, dupsy. Looks like the evil goblins stole the content.';
          } else if (err.message.includes('status 5')) {
            errorMessage = 'The system administrator became lonely and turned off the server to make himself useful again.';
          } else {
            errorMessage = err.message;
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;