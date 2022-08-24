import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AuthorBookService = (function () {
    const _fetchBooks = async (params) => {
        const url = `${UrlUtil.authorURL()}/book/`;

        const response = await axios.get(url, {
            params: {
                keyword: params.search,
                pageSize: params.pagination.pageSize,
                page: params.pagination.current,
                field: params.sorter?.field,
                order: params.sorter?.order,
                genre: params.filter?.genre?.join(",")
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _getCount = async () => {
        const response = await axios.get(`${UrlUtil.authorURL()}/book/count`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }


    return {
        fetchBooks: _fetchBooks,
        getCount: _getCount,
    };
})();

export default AuthorBookService;
