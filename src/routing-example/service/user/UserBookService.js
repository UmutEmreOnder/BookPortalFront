import axios from "axios";
import localStorageUtil from "../../util/LocalStorageUtil";

const UserBookService = (function () {
    const _fetchBooks = async (params) => {
        const response = await axios.get("http://localhost:8080/api/user/book", {
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

    const _delete = async () => {
        const response = await axios.delete(
            "http://localhost:8080/api/user/admin",
            {}
        );

        return response.data;
    };

    return {
        fetchBooks: _fetchBooks,
        delete: _delete
    };
})();

export default UserBookService;
