import { MollieComponent, ComponentType, MollieComponentOptions } from '../types/mollie';
export interface UseMollieComponentResult {
    component: MollieComponent | null;
    containerRef: React.RefObject<HTMLDivElement | null>;
    isReady: boolean;
    error: string | null;
    mount: () => void;
    unmount: () => void;
}
export declare const useMollieComponent: (type: ComponentType, options?: MollieComponentOptions) => UseMollieComponentResult;
//# sourceMappingURL=useMollieComponent.d.ts.map