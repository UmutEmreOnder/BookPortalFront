import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AdminRequestService = (function () {
    const _getRequests = async (params) => {
        const response = await axios.get(`${UrlUtil.adminURL()}/request`, {
            params: {
                pageSize: params.pagination.pageSize,
                page: params.pagination.current,
                field: params.sorter?.field,
                order: params.sorter?.order,
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _acceptRequest = async (record) => {
        const response = await axios.post(`${UrlUtil.adminURL()}/request/accept?id=${record.id}`, {}, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data
    }

    const _denyRequest = async (record) => {
        const response = await axios.post(`${UrlUtil.adminURL()}/request/deny?id=${record.id}`, {}, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data
    }

    const _getCount = async () => {
        const response = await axios.get(`${UrlUtil.adminURL()}/request/count`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }


    return {
        fetchRequests: _getRequests,
        getCount: _getCount,
        accept: _acceptRequest,
        deny: _denyRequest
    }
})();

export default AdminRequestService