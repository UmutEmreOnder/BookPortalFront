import axios from "axios";
import localStorageUtil from "../../util/SessionStorageUtil";

const AdminUserService = (function () {
    const _getUsers = async (params) => {
        if (params.search) {
            const response = await axios.get(`http://localhost:8080/api/admin/user/like/${params.search}`, {
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
        } else {
            const response = await axios.get(`http://localhost:8080/api/admin/user/`, {
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
        }
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