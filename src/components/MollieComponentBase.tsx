import React, { forwardRef, HTMLAttributes } from 'react';
import { useMollieComponent } from '../hooks/useMollieComponent';
import { ComponentType, MollieComponentOptions } from '../types/mollie';

export interface MollieComponentBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  type: ComponentType;
  options?: MollieComponentOptions;
  onReady?: () => void;
  onMollieError?: (error: string) => void;
}

export const MollieComponentBase = forwardRef<HTMLDivElement, MollieComponentBaseProps>(
  ({ type, options, onReady, onMollieError, className, ...divProps }, ref) => {
    const { containerRef, isReady, error } = useMollieComponent(type, options);

    // Handle ready state
    React.useEffect(() => {
      if (isReady && onReady) {
        onReady();
      }
    }, [isReady, onReady]);

    // Handle error state
    React.useEffect(() => {
      if (error && onMollieError) {
        onMollieError(error);
      }
    }, [error, onMollieError]);

    const combinedClassName = `mollie-component mollie-component--${type}${
      isReady ? '' : ' mollie-component--is-loading'
    }${className ? ` ${className}` : ''}`;

    return (
      <div
        {...divProps}
        ref={ref || containerRef}
        className={combinedClassName}
      />
    );
  }
);

MollieComponentBase.displayName = 'MollieComponentBase';
