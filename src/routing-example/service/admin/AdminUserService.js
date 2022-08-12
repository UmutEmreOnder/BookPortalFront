import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AdminUserService = (function () {
    const _getUsers = async (params) => {
        const url = params.search ? `${UrlUtil.adminURL()}/user/like/${params.search}` : `${UrlUtil.adminURL()}/user/`;

        const response = await axios.get(url, {
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                ...params
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _delete = async (record) => {
        const response = await axios.delete(`${UrlUtil.adminURL()}/user?id=${record.id}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    return {
        fetchUsers: _getUsers,
        delete: _delete
    }
})();

export default AdminUserService