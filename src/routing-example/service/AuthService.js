import axios from "axios";
import LocalStorageUtil from "../util/SessionStorageUtil";
import UrlUtil from "../util/UrlUtil";

const AuthService = (function () {
    const _signin = async (credentials) => {
        let valid = null;

        LocalStorageUtil.setToken(btoa(`${credentials.username}:${credentials.password}`));

        try {
            valid = await axios.get(`${UrlUtil.userURL()}/`, {
                headers: {
                    "Authorization": `Basic ${LocalStorageUtil.getToken()}`
                }
            });
        } catch (error) {
            LocalStorageUtil.clearToken();
            return null;
        }

        return valid.data;
    };

    return {
        signin: _signin
    };
})();

export default AuthService;
