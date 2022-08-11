import axios from "axios";
import LocalStorageUtil from "../../util/LocalStorageUtil";

const UserService = (function () {
    const _getUser = async () => {
        let valid = null;

        if(LocalStorageUtil.getToken()) {
            try {
                valid = await axios.get(`http://localhost:8080/api/user/`, {
                    withCredentials: true,
                    headers: {
                        "Authorization": `Basic ${LocalStorageUtil.getToken()}`
                    }
                });
            } catch (error) {
                LocalStorageUtil.clearToken();
            }
            return valid.data;
        } else {
            return valid;
        }

    };

    const _register = async (credentials) => {
        return await axios.post('http://localhost:8080/api/user/', credentials)
    }

    const _updateUser = async (credentials) => {
        const response = await axios.put(`http://localhost:8080/api/user/?id=${credentials.id}`, credentials, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }


    return {
        getUser: _getUser(),
        register: _register,
        updateUser: _updateUser,
    };
})();

export default UserService;
