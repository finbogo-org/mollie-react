import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { MollieComponentBase } from './MollieComponentBase';
export const CardNumberComponent = forwardRef((props, ref) => {
    return _jsx(MollieComponentBase, Object.assign({}, props, { type: "cardNumber", ref: ref }));
});
CardNumberComponent.displayName = 'CardNumberComponent';
//# sourceMappingURL=CardNumberComponent.js.map