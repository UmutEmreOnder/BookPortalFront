import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Comment, Form, Input, List, Pagination} from 'antd';
import CommentService from "../../service/book/CommentService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import SessionStorageUtil from "../../util/SessionStorageUtil";

const {TextArea} = Input;

const CommentList = ({comments, fetch}) => {
    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={(props) => {
                if (props.uname === SessionStorageUtil.getUser().username) {
                    return (
                        <>
                            <Comment {...props} />
                            <a style={{fontSize: "10px", color: "red"}} onClick={async () => {
                                await CommentService.deleteComment(props.id)
                                ToastifyUtil.success(MessageUtil.deleteCommentSuccess());
                                fetch(1, 5)
                            }}>Delete</a>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Comment {...props} />
                        </>
                    )
                }
            }
            }
        />
    )
};

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={2} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const CommentSection = (bookId) => {
    let commentsList = []
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        fetch(1, 5)
    }, [])

    async function fetch(page, pageSize) {
        CommentService.fetchComments(bookId.bookId, page, pageSize).then(value => {
            for (let i = 0; i < value.length; i++) {
                commentsList.push({
                    id: value[i].id,
                    author: `${value[i].user.name} ${value[i].user.surname}`,
                    content: <p>{value[i].comment}</p>,
                    uname: value[i].user.username,
                })
            }
        })

        setComments(commentsList);
    }

    const handleSubmit = async () => {
        if (!value) return;
        setSubmitting(true);

        await CommentService.addComment(bookId.bookId, value);

        setSubmitting(false);
        setValue('');
        await fetch(1, 5)
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const onChange = async (page, pageSize) => {
        commentsList = []
        await fetch(page, pageSize);
    }

    return (
        <div>
            <Comment
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
            <CommentList comments={comments}/>

            <Pagination simple defaultCurrent={1} pageSize={5} total={50}
                        onChange={(page, pageSize) => onChange(page, pageSize)}/>
        </div>
    );
};

export default CommentSection;