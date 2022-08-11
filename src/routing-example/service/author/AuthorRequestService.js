import axios from "axios";
import LocalStorageUtil from "../../util/LocalStorageUtil";

const AuthorRequestService = (function () {
    const _create = async (credentials) => {
        const response = await axios.post(`http://localhost:8080/api/author/request`, credentials, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getRequests = async () => {
        const response = await axios.get(`http://localhost:8080/api/author/current-requests`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getResponses = async () => {
        const response = await axios.get(`http://localhost:8080/api/author/responded-requests`, {
            withCredentials: true,
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