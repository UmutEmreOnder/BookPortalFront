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
        return await axios.post(`${UrlUtil.userURL()}/comment?bookId=${bookId}`, {comment: comment}, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });
    }

    const _deleteComment = async (commentId) => {
        const response = await axios.delete(`${UrlUtil.userURL()}/comment?id=${commentId}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _deleteCommentAdmin = async (commentId) => {
        const response = await axios.delete(`${UrlUtil.adminURL()}/comment?id=${commentId}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    return {
        fetchComments: _fetchComments,
        addComment: _addComment,
        deleteComment: _deleteComment,
        deleteCommentAdmin: _deleteCommentAdmin
    }
})();

export default CommentService;