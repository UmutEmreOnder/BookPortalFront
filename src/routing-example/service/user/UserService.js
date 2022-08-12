import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const UserService = (function () {
    const _getUser = async () => {
        let valid = null;

        if(SessionStorageUtil.getToken()) {
            try {
                valid = await axios.get(`${UrlUtil.userURL()}/`, {
                    headers: {
                        "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                    }
                });
            } catch (error) {
                SessionStorageUtil.clearToken();
            }
            return valid.data;
        } else {
            return valid;
        }

    };

    const _register = async (credentials) => {
        let response = null;
        try {
            response = await axios.post(`${UrlUtil.userURL()}/`, credentials)
        } catch (error) {
            return null;
        }

        return response;
    }

    const _updateUser = async (credentials) => {
        try {
            const response = await axios.put(`${UrlUtil.userURL()}/?id=${credentials.id}`, credentials, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            })
            return response.data
        } catch (error) {
            return null;
        }
    }


    return {
        getUser: _getUser(),
        register: _register,
        updateUser: _updateUser,
    };
})();

export default UserService;
