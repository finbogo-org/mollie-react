import React, { HTMLAttributes } from 'react';
import { ComponentType, MollieComponentOptions } from '../types/mollie';
export interface MollieComponentBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    type: ComponentType;
    options?: MollieComponentOptions;
    onReady?: () => void;
    onMollieError?: (error: string) => void;
}
export declare const MollieComponentBase: React.ForwardRefExoticComponent<MollieComponentBaseProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MollieComponentBase.d.ts.map