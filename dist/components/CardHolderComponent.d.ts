import React from 'react';
import { MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';
export interface CardHolderComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
    options?: MollieComponentOptions;
}
export declare const CardHolderComponent: React.ForwardRefExoticComponent<CardHolderComponentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CardHolderComponent.d.ts.map