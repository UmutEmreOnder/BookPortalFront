import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Avatar, Button, Comment, Form, Input, List, Pagination} from 'antd';
import CommentService from "../../service/book/CommentService";

const {TextArea} = Input;

const CommentList = ({comments}) => {
    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={(props) => <Comment {...props} />}
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
    let listComments = []
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        fetch(1, 5)
    }, [])

    async function fetch(page, pageSize) {
        CommentService.fetchComments(bookId.bookId, page, pageSize).then(value => {
            for (let i = 0; i < value.length; i++) {
                listComments.push({
                    author: `${value[i].user.name} ${value[i].user.surname}`,
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: <p>{value[i].comment}</p>
                })
            }
        })

        await setComments(listComments);
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
        listComments = []
        await fetch(page, pageSize);
    }

    return (
        <div>
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
            {comments.length > 0 && <CommentList comments={comments}/>}

            <Pagination simple defaultCurrent={1} pageSize={5} total={50}
                        onChange={(page, pageSize) => onChange(page, pageSize)}/>
        </div>
    );
};

export default CommentSection;