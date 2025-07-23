import React, { forwardRef } from 'react';
import { MollieComponentBase, MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';

export interface CardNumberComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
  options?: MollieComponentOptions;
}

export const CardNumberComponent = forwardRef<HTMLDivElement, CardNumberComponentProps>(
  (props, ref) => {
    return <MollieComponentBase {...props} type="cardNumber" ref={ref} />;
  }
);

CardNumberComponent.displayName = 'CardNumberComponent';
