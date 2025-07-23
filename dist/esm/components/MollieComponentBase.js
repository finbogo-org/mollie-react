var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import { useMollieComponent } from '../hooks/useMollieComponent';
export const MollieComponentBase = forwardRef((_a, ref) => {
    var { type, options, onReady, onMollieError, className } = _a, divProps = __rest(_a, ["type", "options", "onReady", "onMollieError", "className"]);
    const { containerRef, isReady, error } = useMollieComponent(type, options);
    // Handle ready state
    React.useEffect(() => {
        if (isReady && onReady) {
            onReady();
        }
    }, [isReady, onReady]);
    // Handle error state
    React.useEffect(() => {
        if (error && onMollieError) {
            onMollieError(error);
        }
    }, [error, onMollieError]);
    const combinedClassName = `mollie-component mollie-component--${type}${isReady ? '' : ' mollie-component--is-loading'}${className ? ` ${className}` : ''}`;
    return (_jsx("div", Object.assign({}, divProps, { ref: ref || containerRef, className: combinedClassName })));
});
MollieComponentBase.displayName = 'MollieComponentBase';
//# sourceMappingURL=MollieComponentBase.js.map