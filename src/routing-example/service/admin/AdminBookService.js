import axios from "axios";
import localStorageUtil from "../../util/LocalStorageUtil";

const AdminBookService = (function () {
    const _fetchBooks = async (params) => {
        const response = await axios.get("http://localhost:8080/api/admin/book", {
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

        if (!response) {
            console.log("Bir hata oluştu");
            //ToDo: Display error message to user not just log it
            //Ex: https://www.npmjs.com/package/react-toastify
            return;
        }

        return response.data;
    };

    const _delete = async (record) => {
        const response = await axios.delete(`http://localhost:8080/api/admin/book?id=${record.id}`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    return {
        fetchBooks: _fetchBooks,
        delete: _delete
    };
})();

export default AdminBookService;
