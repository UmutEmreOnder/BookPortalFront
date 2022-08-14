import {toast} from "react-toastify";

const ToastifyUtil = (function () {
    const _sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const _success = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const _error = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const _info = (message) => toast.info(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    return {
        sleep: _sleep,
        success: _success,
        error: _error,
        info: _info
    };
})();

export default ToastifyUtil;