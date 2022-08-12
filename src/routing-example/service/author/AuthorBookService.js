import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AuthorBookService = (function () {
    const _fetchBooks = async (params) => {
        const url = params.search ? `${UrlUtil.authorURL()}/book/like/${params.search}` : `${UrlUtil.authorURL()}/book/`;

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

    return {
        fetchBooks: _fetchBooks,
    };
})();

export default AuthorBookService;
