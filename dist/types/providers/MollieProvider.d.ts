import React, { ReactNode } from 'react';
import { MollieInstance, MollieOptions } from '../types/mollie';
export interface MollieContextValue {
    mollie: MollieInstance | null;
    isLoading: boolean;
    error: string | null;
}
export interface MollieProviderProps {
    children: ReactNode;
    profileId: string;
    options?: MollieOptions;
    scriptUrl?: string;
}
export declare const MollieProvider: React.FC<MollieProviderProps>;
export declare const useMollie: () => MollieContextValue;
//# sourceMappingURL=MollieProvider.d.ts.map