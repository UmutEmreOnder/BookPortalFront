import axios from "axios";
import SessionStorageUtil from "../util/SessionStorageUtil";
import UrlUtil from "../util/UrlUtil";

const AuthService = (function () {
    const _signin = async (credentials) => {
        let valid = null;

        SessionStorageUtil.setToken(btoa(`${credentials.username}:${credentials.password}`));

        try {
            valid = await axios.get(`${UrlUtil.userURL()}/`, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            });
        } catch (error) {
            SessionStorageUtil.clearToken();
            return null;
        }

        return valid.data;
    };

    return {
        signin: _signin
    };
})();

export default AuthService;
