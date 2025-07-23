"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateToken = void 0;
const react_1 = require("react");
const MollieProvider_1 = require("../providers/MollieProvider");
const useCreateToken = () => {
    const { mollie } = (0, MollieProvider_1.useMollie)();
    const [isCreatingToken, setIsCreatingToken] = (0, react_1.useState)(false);
    const [tokenError, setTokenError] = (0, react_1.useState)(null);
    const createToken = (0, react_1.useCallback)(async () => {
        if (!mollie) {
            const error = 'Mollie is not initialized';
            setTokenError(error);
            return { error: { message: error } };
        }
        setIsCreatingToken(true);
        setTokenError(null);
        try {
            const result = await mollie.createToken();
            setIsCreatingToken(false);
            if (result.error) {
                setTokenError(result.error.message);
            }
            return result;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create token';
            setTokenError(errorMessage);
            setIsCreatingToken(false);
            return { error: { message: errorMessage } };
        }
    }, [mollie]);
    return {
        createToken,
        isCreatingToken,
        tokenError,
    };
};
exports.useCreateToken = useCreateToken;
//# sourceMappingURL=useCreateToken.js.map