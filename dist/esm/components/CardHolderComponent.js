import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { MollieComponentBase } from './MollieComponentBase';
export const CardHolderComponent = forwardRef((props, ref) => {
    return _jsx(MollieComponentBase, Object.assign({}, props, { type: "cardHolder", ref: ref }));
});
CardHolderComponent.displayName = 'CardHolderComponent';
//# sourceMappingURL=CardHolderComponent.js.map