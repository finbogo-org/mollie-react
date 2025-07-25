import { useEffect, useRef, useState, useCallback } from 'react';
import { useMollie } from '../providers/MollieProvider';
import { MollieComponent, ComponentType, MollieComponentOptions } from '../types/mollie';

export interface UseMollieComponentResult {
  component: MollieComponent | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
  error: string | null;
  mount: () => void;
  unmount: () => void;
}

export const useMollieComponent = (
  type: ComponentType,
  options?: MollieComponentOptions
): UseMollieComponentResult => {
  const { mollie, isLoading, error: mollieError } = useMollie();
  const [component, setComponent] = useState<MollieComponent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(false);

  // Create component when Mollie is ready
  useEffect(() => {
    if (!mollie || isLoading || mollieError) {
      return;
    }

    try {
      const newComponent = mollie.createComponent(type, options);
      setComponent(newComponent);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create component');
      setComponent(null);
    }
  }, [mollie, isLoading, mollieError, type, options]);

  // Set up error handling
  useEffect(() => {
    if (mollieError) {
      setError(mollieError);
    }
  }, [mollieError]);

  const mount = useCallback(() => {
    if (!component || !containerRef.current || isMountedRef.current) {
      return;
    }

    try {
      component.mount(containerRef.current);
      isMountedRef.current = true;
      setIsReady(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mount component');
      setIsReady(false);
    }
  }, [component]);

  const unmount = useCallback(() => {
    if (!component || !isMountedRef.current) {
      return;
    }

    try {
      component.unmount();
      isMountedRef.current = false;
      setIsReady(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unmount component');
    }
  }, [component]);

  // Auto-mount when component and container are ready
  useEffect(() => {
    if (component && containerRef.current && !isMountedRef.current) {
      mount();
    }
  }, [component, mount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (component && isMountedRef.current) {
        try {
          component.unmount();
        } catch (err) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [component]);

  return {
    component,
    containerRef,
    isReady,
    error,
    mount,
    unmount,
  };
};
