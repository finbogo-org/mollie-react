import { TokenResult } from '../types/mollie';
export interface UseCreateTokenResult {
    createToken: () => Promise<TokenResult>;
    isCreatingToken: boolean;
    tokenError: string | null;
}
export declare const useCreateToken: () => UseCreateTokenResult;
//# sourceMappingURL=useCreateToken.d.ts.map