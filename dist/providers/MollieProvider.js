import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const MollieContext = createContext(undefined);
const DEFAULT_SCRIPT_URL = 'https://js.mollie.com/v1/mollie.js';
export const MollieProvider = ({ children, profileId, options = {}, scriptUrl = DEFAULT_SCRIPT_URL, }) => {
    const [mollie, setMollie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Check if script is already loaded
        if (window.Mollie) {
            try {
                const mollieInstance = window.Mollie(profileId, options);
                setMollie(mollieInstance);
                setIsLoading(false);
                return;
            }
            catch (err) {
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
                        const mollieInstance = window.Mollie(profileId, options);
                        setMollie(mollieInstance);
                    }
                    else {
                        setError('Mollie script loaded but Mollie constructor not available');
                    }
                }
                catch (err) {
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
                    const mollieInstance = window.Mollie(profileId, options);
                    setMollie(mollieInstance);
                }
                else {
                    setError('Mollie script loaded but Mollie constructor not available');
                }
            }
            catch (err) {
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
    }, [profileId, options, scriptUrl]);
    const contextValue = {
        mollie,
        isLoading,
        error,
    };
    return (_jsx(MollieContext.Provider, { value: contextValue, children: children }));
};
export const useMollie = () => {
    const context = useContext(MollieContext);
    if (context === undefined) {
        throw new Error('useMollie must be used within a MollieProvider');
    }
    return context;
};
//# sourceMappingURL=MollieProvider.js.map