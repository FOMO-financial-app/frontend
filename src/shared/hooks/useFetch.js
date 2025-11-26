import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useFetch(url){
    if (typeof url !== 'string' || url.trim() === '') {
        throw new Error('useFetch: url must be a non-empty string');
    }

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const controller = new AbortController();
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get(url, {
                    signal: controller.signal
                });

                setData(response.data);
                setError(null);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
        return () => controller.abort();
    }, [url]);
    
    return { data, loading, error };
}
