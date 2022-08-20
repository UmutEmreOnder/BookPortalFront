import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AuthorRequestService = (function () {
    const _create = async (credentials) => {
        const response = await axios.post(`${UrlUtil.authorURL()}/request`, credentials, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getRequests = async (params) => {
        const response = await axios.get(`${UrlUtil.authorURL()}/current-requests`, {
            params: {
                page: params.pagination.current,
                pageSize: params.pagination.pageSize,
                field: params.sorter?.field,
                order: params.sorter?.order,
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getResponses = async (params) => {
        const response = await axios.get(`${UrlUtil.authorURL()}/responded-requests`, {
            params: {
                page: params.pagination.current,
                pageSize: params.pagination.pageSize,
                field: params.sorter?.field,
                order: params.sorter?.order,
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getRequestCount = async () => {
        const response = await axios.get(`${UrlUtil.authorURL()}/current-requests/count`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _getRespondCount = async () => {
        const response = await axios.get(`${UrlUtil.authorURL()}/responded-requests/count`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }


    return {
        fetchRequests: _getRequests,
        fetchResponses: _getResponses,
        create: _create,
        getReqCount: _getRequestCount,
        getResCount: _getRespondCount,
    }
})();

export default AuthorRequestService