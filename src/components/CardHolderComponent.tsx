import React, { forwardRef } from 'react';
import { MollieComponentBase, MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';

export interface CardHolderComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
  options?: MollieComponentOptions;
}

export const CardHolderComponent = forwardRef<HTMLDivElement, CardHolderComponentProps>(
  (props, ref) => {
    return <MollieComponentBase {...props} type="cardHolder" ref={ref} />;
  }
);

CardHolderComponent.displayName = 'CardHolderComponent';
