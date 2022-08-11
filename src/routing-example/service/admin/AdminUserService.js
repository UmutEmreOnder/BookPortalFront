import axios from "axios";
import localStorageUtil from "../../util/SessionStorageUtil";

const AdminUserService = (function () {
    const _getUsers = async (params) => {
        const url = params.search ? `http://localhost:8080/api/admin/user/like/${params.search}` : `http://localhost:8080/api/admin/user/`;

        const response = await axios.get(url, {
            withCredentials: true,
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                ...params
            },
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _delete = async (record) => {
        const response = await axios.delete(`http://localhost:8080/api/admin/user?id=${record.id}`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
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