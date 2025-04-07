import { useCallback } from "react";
import { toast } from "react-toastify";

export const useToast = () => {
    const showToast = useCallback((type, message, options = {}) => {
        // Only show toast if we're in a browser environment
        if (typeof window !== "undefined" && toast) {
            switch (type) {
                case "success":
                    toast.success(message, options);
                    break;
                case "error":
                    toast.error(message, options);
                    break;
                case "info":
                    toast.info(message, options);
                    break;
                case "warning":
                    toast.warning(message, options);
                    break;
                default:
                    toast(message, options);
            }
        }
    }, []);

    return {
        success: (message, options) => showToast("success", message, options),
        error: (message, options) => showToast("error", message, options),
        info: (message, options) => showToast("info", message, options),
        warning: (message, options) => showToast("warning", message, options),
    };
};

export default useToast;
