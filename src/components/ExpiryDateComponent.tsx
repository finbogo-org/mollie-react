import React, { forwardRef } from 'react';
import { MollieComponentBase, MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';

export interface ExpiryDateComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
  options?: MollieComponentOptions;
}

export const ExpiryDateComponent = forwardRef<HTMLDivElement, ExpiryDateComponentProps>(
  (props, ref) => {
    return <MollieComponentBase {...props} type="expiryDate" ref={ref} />;
  }
);

ExpiryDateComponent.displayName = 'ExpiryDateComponent';
