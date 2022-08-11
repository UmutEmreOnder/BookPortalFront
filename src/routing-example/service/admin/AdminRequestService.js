import axios from "axios";
import LocalStorageUtil from "../../util/SessionStorageUtil";

const AdminRequestService = (function () {
    const _getRequests = async () => {
        const response = await axios.get(`http://localhost:8080/api/admin/request`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _acceptRequest = async(record) => {
        const response = await axios.post(`http://localhost:8080/api/admin/request/accept?id=${record.id}`, {}, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data
    }

    const _denyRequest = async(record) => {
        const response = await axios.post(`http://localhost:8080/api/admin/request/deny?id=${record.id}`, {}, {
            withCredentials: true,
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