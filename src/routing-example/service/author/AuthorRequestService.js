import axios from "axios";
import LocalStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AuthorRequestService = (function () {
    const _create = async (credentials) => {
        const response = await axios.post(`${UrlUtil.authorURL()}/request`, credentials, {
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getRequests = async () => {
        const response = await axios.get(`${UrlUtil.authorURL()}/current-requests`, {
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getResponses = async () => {
        const response = await axios.get(`${UrlUtil.authorURL()}/responded-requests`, {
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    return {
        fetchRequests: _getRequests,
        fetchResponses: _getResponses,
        create: _create
    }
})();

export default AuthorRequestService