import React, { forwardRef } from 'react';
import { MollieComponentBase, MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';

export interface CardComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
  options?: MollieComponentOptions;
}

export const CardComponent = forwardRef<HTMLDivElement, CardComponentProps>(
  (props, ref) => {
    return <MollieComponentBase {...props} type="card" ref={ref} />;
  }
);

CardComponent.displayName = 'CardComponent';
