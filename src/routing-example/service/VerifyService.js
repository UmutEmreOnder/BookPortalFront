import axios from "axios";
import UrlUtil from "../util/UrlUtil";

const VerifyService = (function () {
    const _verify = async (token) => {
        const response = await axios.get(`${UrlUtil.registerURL()}/verify?token=${token}`, {});
        return response.data;
    }

    const _createNewMail = async (mail) => {
        try {
            return await axios.post(`${UrlUtil.registerURL()}/verify?email=${mail}`, {}, {});
        } catch (e) {
            return null
        }
    }

    return {
        verify: _verify,
        createNewMail: _createNewMail,
    }
})();

export default VerifyService;