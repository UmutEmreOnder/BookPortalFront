import axios from "axios";
import LocalStorageUtil from "../util/SessionStorageUtil";

const AuthService = (function () {
    const _signin = async (credentials) => {
        let valid = null;

        LocalStorageUtil.setToken(btoa(`${credentials.username}:${credentials.password}`));

        try {
            valid = await axios.get(`http://localhost:8080/api/admin/baseuser/${credentials.username}`, {
                withCredentials: true,
                headers: {
                    "Authorization": `Basic ${btoa("sys.admin:admin")}`
                }
            });
        } catch (error) {
            LocalStorageUtil.clearToken();
        }

        return valid.data;
    };

    return {
        signin: _signin
    };
})();

export default AuthService;
