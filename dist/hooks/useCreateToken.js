import { useCallback, useState } from 'react';
import { useMollie } from '../providers/MollieProvider';
export const useCreateToken = () => {
    const { mollie } = useMollie();
    const [isCreatingToken, setIsCreatingToken] = useState(false);
    const [tokenError, setTokenError] = useState(null);
    const createToken = useCallback(async () => {
        if (!mollie) {
            const error = 'Mollie is not initialized';
            setTokenError(error);
            return { error: { message: error } };
        }
        setIsCreatingToken(true);
        setTokenError(null);
        try {
            const result = await mollie.createToken();
            setIsCreatingToken(false);
            if (result.error) {
                setTokenError(result.error.message);
            }
            return result;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create token';
            setTokenError(errorMessage);
            setIsCreatingToken(false);
            return { error: { message: errorMessage } };
        }
    }, [mollie]);
    return {
        createToken,
        isCreatingToken,
        tokenError,
    };
};
//# sourceMappingURL=useCreateToken.js.map