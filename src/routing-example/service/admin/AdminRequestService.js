import axios from "axios";
import LocalStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AdminRequestService = (function () {
    const _getRequests = async () => {
        const response = await axios.get(`${UrlUtil.adminURL()}/request`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _acceptRequest = async(record) => {
        const response = await axios.post(`${UrlUtil.adminURL()}/request/accept?id=${record.id}`, {}, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data
    }

    const _denyRequest = async(record) => {
        const response = await axios.post(`${UrlUtil.adminURL()}/request/deny?id=${record.id}`, {}, {
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data
    }


    return {
        fetchRequests: _getRequests,
        accept: _acceptRequest,
        deny: _denyRequest
    }
})();

export default AdminRequestService