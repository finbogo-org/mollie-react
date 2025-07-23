import React from 'react';
import { MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';
export interface ExpiryDateComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
    options?: MollieComponentOptions;
}
export declare const ExpiryDateComponent: React.ForwardRefExoticComponent<ExpiryDateComponentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExpiryDateComponent.d.ts.map