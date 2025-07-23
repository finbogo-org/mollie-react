"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMollieComponent = void 0;
var react_1 = require("react");
var MollieProvider_1 = require("../providers/MollieProvider");
var useMollieComponent = function (type, options) {
    var _a = (0, MollieProvider_1.useMollie)(), mollie = _a.mollie, isLoading = _a.isLoading, mollieError = _a.error;
    var _b = (0, react_1.useState)(null), component = _b[0], setComponent = _b[1];
    var _c = (0, react_1.useState)(false), isReady = _c[0], setIsReady = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var containerRef = (0, react_1.useRef)(null);
    var isMountedRef = (0, react_1.useRef)(false);
    // Create component when Mollie is ready
    (0, react_1.useEffect)(function () {
        if (!mollie || isLoading || mollieError) {
            return;
        }
        try {
            var newComponent = mollie.createComponent(type, options);
            setComponent(newComponent);
            setError(null);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create component');
            setComponent(null);
        }
    }, [mollie, isLoading, mollieError, type, options]);
    // Set up error handling
    (0, react_1.useEffect)(function () {
        if (mollieError) {
            setError(mollieError);
        }
    }, [mollieError]);
    var mount = (0, react_1.useCallback)(function () {
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
    var unmount = (0, react_1.useCallback)(function () {
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
    (0, react_1.useEffect)(function () {
        if (component && containerRef.current && !isMountedRef.current) {
            mount();
        }
    }, [component, mount]);
    // Cleanup on unmount
    (0, react_1.useEffect)(function () {
        return function () {
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
        component: component,
        containerRef: containerRef,
        isReady: isReady,
        error: error,
        mount: mount,
        unmount: unmount,
    };
};
exports.useMollieComponent = useMollieComponent;
