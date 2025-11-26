export function useMutation(service) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const execute = async (...args) => {
        try {
            setLoading(true);
            setSuccess(false);
            
            const response = await service(...args);
            
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    return { execute, loading, error, success };
}
