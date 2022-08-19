import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AdminUserService = (function () {
    const _getUsers = async (params) => {
        const url = params.search ? `${UrlUtil.adminURL()}/user/like/${params.search}` : `${UrlUtil.adminURL()}/user/`;

        const response = await axios.get(url, {
            params: {
                pageSize: params.pagination.pageSize,
                page: params.pagination.current,
                field: params.sorter?.field,
                order: params.sorter?.order,
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

    const _getCount = async () => {
        const response = await axios.get(`${UrlUtil.adminURL()}/user/count`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    return {
        fetchUsers: _getUsers,
        delete: _delete,
        getCount: _getCount,
    }
})();

export default AdminUserService