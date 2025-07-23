import React from 'react';
import { MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';
export interface VerificationCodeComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
    options?: MollieComponentOptions;
}
export declare const VerificationCodeComponent: React.ForwardRefExoticComponent<VerificationCodeComponentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VerificationCodeComponent.d.ts.map