import axios from "axios";
import localStorageUtil from "../../util/SessionStorageUtil";

const AuthorBookService = (function () {
    const _fetchBooks = async (params) => {
        const url = params.search ? `http://localhost:8080/api/author/book/like/${params.search}` : `http://localhost:8080/api/author/book/`;

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

    return {
        fetchBooks: _fetchBooks,
    };
})();

export default AuthorBookService;
