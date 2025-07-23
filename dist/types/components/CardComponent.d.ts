import React from 'react';
import { MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';
export interface CardComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
    options?: MollieComponentOptions;
}
export declare const CardComponent: React.ForwardRefExoticComponent<CardComponentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CardComponent.d.ts.map