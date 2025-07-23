"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMollieComponent = void 0;
const react_1 = require("react");
const MollieProvider_1 = require("../providers/MollieProvider");
const useMollieComponent = (type, options) => {
    const { mollie, isLoading, error: mollieError } = (0, MollieProvider_1.useMollie)();
    const [component, setComponent] = (0, react_1.useState)(null);
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const containerRef = (0, react_1.useRef)(null);
    const isMountedRef = (0, react_1.useRef)(false);
    // Create component when Mollie is ready
    (0, react_1.useEffect)(() => {
        if (!mollie || isLoading || mollieError) {
            return;
        }
        try {
            const newComponent = mollie.createComponent(type, options);
            setComponent(newComponent);
            setError(null);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create component');
            setComponent(null);
        }
    }, [mollie, isLoading, mollieError, type, options]);
    // Set up error handling
    (0, react_1.useEffect)(() => {
        if (mollieError) {
            setError(mollieError);
        }
    }, [mollieError]);
    const mount = (0, react_1.useCallback)(() => {
        if (!component || !containerRef.current || isMountedRef.current) {
            return;
        }
        try {
            component.mount(containerRef.current);
            isMountedRef.current = true;
            setIsReady(true);
            setError(null);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to mount component');
            setIsReady(false);
        }
    }, [component]);
    const unmount = (0, react_1.useCallback)(() => {
        if (!component || !isMountedRef.current) {
            return;
        }
        try {
            component.unmount();
            isMountedRef.current = false;
            setIsReady(false);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to unmount component');
        }
    }, [component]);
    // Auto-mount when component and container are ready
    (0, react_1.useEffect)(() => {
        if (component && containerRef.current && !isMountedRef.current) {
            mount();
        }
    }, [component, mount]);
    // Cleanup on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (component && isMountedRef.current) {
                try {
                    component.unmount();
                }
                catch (err) {
                    // Ignore errors during cleanup
                }
            }
        };
    }, [component]);
    return {
        component,
        containerRef,
        isReady,
        error,
        mount,
        unmount,
    };
};
exports.useMollieComponent = useMollieComponent;
//# sourceMappingURL=useMollieComponent.js.map