import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AuthorService = (function () {
    const _updateAuthor = async (credentials) => {
        try {
            const response = await axios.put(`${UrlUtil.authorURL()}/?id=${credentials.id}`, credentials, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            })

            return response.data;
        } catch (e) {
            return null;
        }
    }

    const _register = async (credentials) => {
        try {
            const response = await axios.post(`${UrlUtil.adminURL()}/author`, credentials, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            })

            return response.data;
        } catch (e) {
            return null;
        }
    }

    return {
        updateAuthor: _updateAuthor,
        register: _register
    }
})();

export default AuthorService