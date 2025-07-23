import { useCallback, useState } from 'react';
import { useMollie } from '../providers/MollieProvider';
import { TokenResult } from '../types/mollie';

export interface UseCreateTokenResult {
  createToken: () => Promise<TokenResult>;
  isCreatingToken: boolean;
  tokenError: string | null;
}

export const useCreateToken = (): UseCreateTokenResult => {
  const { mollie } = useMollie();
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const createToken = useCallback(async (): Promise<TokenResult> => {
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
    } catch (err) {
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
