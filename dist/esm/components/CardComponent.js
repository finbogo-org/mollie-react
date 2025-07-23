import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { MollieComponentBase } from './MollieComponentBase';
export const CardComponent = forwardRef((props, ref) => {
    return _jsx(MollieComponentBase, Object.assign({}, props, { type: "card", ref: ref }));
});
CardComponent.displayName = 'CardComponent';
//# sourceMappingURL=CardComponent.js.map