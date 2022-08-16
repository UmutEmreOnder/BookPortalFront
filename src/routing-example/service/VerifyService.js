import axios from "axios";
import UrlUtil from "../util/UrlUtil";

const VerifyService = (function () {
    const _verify = async (token) => {
        return axios.get(`${UrlUtil.userURL()}/verify?token=${token}`, {});
    }

    return {
        verify: _verify
    }
})();

export default VerifyService;