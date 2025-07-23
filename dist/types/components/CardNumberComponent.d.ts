import React from 'react';
import { MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';
export interface CardNumberComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
    options?: MollieComponentOptions;
}
export declare const CardNumberComponent: React.ForwardRefExoticComponent<CardNumberComponentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CardNumberComponent.d.ts.map