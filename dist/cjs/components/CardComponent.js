"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const MollieComponentBase_1 = require("./MollieComponentBase");
exports.CardComponent = (0, react_1.forwardRef)((props, ref) => {
    return (0, jsx_runtime_1.jsx)(MollieComponentBase_1.MollieComponentBase, Object.assign({}, props, { type: "card", ref: ref }));
});
exports.CardComponent.displayName = 'CardComponent';
//# sourceMappingURL=CardComponent.js.map