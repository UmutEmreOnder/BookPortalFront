import axios from "axios";
import UrlUtil from "../../util/UrlUtil";
import SessionStorageUtil from "../../util/SessionStorageUtil";

const CommentService = (function () {
    const _fetchComments = async (bookId, page, pageSize) => {
        const response = await axios.get(`${UrlUtil.userURL()}/comment?bookId=${bookId}&page=${page}&pageSize=${pageSize}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _addComment = async (bookId, comment) => {
        const response = await axios.post(`${UrlUtil.userURL()}/comment?bookId=${bookId}`, {comment: comment}, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response;
    }

    return {
        fetchComments: _fetchComments,
        addComment: _addComment,
    }
})();

export default CommentService;