import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { MollieInstance, MollieOptions, MollieConstructor } from '../types/mollie';

export interface MollieContextValue {
  mollie: MollieInstance | null;
  isLoading: boolean;
  error: string | null;
}

const MollieContext = createContext<MollieContextValue | undefined>(undefined);

export interface MollieProviderProps {
  children: ReactNode;
  profileId: string;
  options?: MollieOptions;
  scriptUrl?: string;
}

const DEFAULT_SCRIPT_URL = 'https://js.mollie.com/v1/mollie.js';

export const MollieProvider: React.FC<MollieProviderProps> = ({
  children,
  profileId,
  options = {},
  scriptUrl = DEFAULT_SCRIPT_URL,
}) => {
  const [mollie, setMollie] = useState<MollieInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    // Check if script is already loaded
    if (window.Mollie) {
      try {
        const mollieInstance = window.Mollie(profileId, memoizedOptions);
        setMollie(mollieInstance);
        setIsLoading(false);
        return;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Mollie');
        setIsLoading(false);
        return;
      }
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      // Script is already loading, wait for it to complete
      const handleLoad = () => {
        try {
          if (window.Mollie) {
            const mollieInstance = window.Mollie(profileId, memoizedOptions);
            setMollie(mollieInstance);
          } else {
            setError('Mollie script loaded but Mollie constructor not available');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to initialize Mollie');
        }
        setIsLoading(false);
      };

      const handleError = () => {
        setError('Failed to load Mollie script');
        setIsLoading(false);
      };

      existingScript.addEventListener('load', handleLoad);
      existingScript.addEventListener('error', handleError);

      return () => {
        existingScript.removeEventListener('load', handleLoad);
        existingScript.removeEventListener('error', handleError);
      };
    }

    // Load the script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;

    const handleLoad = () => {
      try {
        if (window.Mollie) {
          const mollieInstance = window.Mollie(profileId, memoizedOptions);
          setMollie(mollieInstance);
        } else {
          setError('Mollie script loaded but Mollie constructor not available');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Mollie');
      }
      setIsLoading(false);
    };

    const handleError = () => {
      setError('Failed to load Mollie script');
      setIsLoading(false);
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      // Note: We don't remove the script on unmount to avoid breaking other instances
    };
  }, [profileId, memoizedOptions, scriptUrl]);

  const contextValue: MollieContextValue = {
    mollie,
    isLoading,
    error,
  };

  return (
    <MollieContext.Provider value={contextValue}>
      {children}
    </MollieContext.Provider>
  );
};

export const useMollie = (): MollieContextValue => {
  const context = useContext(MollieContext);
  if (context === undefined) {
    throw new Error('useMollie must be used within a MollieProvider');
  }
  return context;
};
