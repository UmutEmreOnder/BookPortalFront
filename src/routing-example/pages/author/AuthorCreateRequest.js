import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import AuthorRequestService from "../../service/author/AuthorRequestService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import SessionStorageUtil from "../../util/SessionStorageUtil";

const Request = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});

    const onFinish = async () => {
        const response = await AuthorRequestService.create(credentials);

        if (response) {
            ToastifyUtil.success(MessageUtil.requestSuccess())
            navigate('/')
        } else {
            ToastifyUtil.error(MessageUtil.requestFailed());
        }
    };

    useEffect(() => {
        if (!canLoad()) {
            ToastifyUtil.error(MessageUtil.noPermission())
            navigate('/restriction')
        }
    }, [])

    const canLoad = () => {
        return SessionStorageUtil.getUser()?.roles[0].id === 3;
    }


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    const handleGenreChange = (event) => {
        setCredentials({
            ...credentials,
            genreName: event
        })
    }

    return (
        <>
            <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={{remember: true}}
                  onFinish={onFinish} onFinishFailed={onFinishFailed}
                  style={{margin: "0 auto", width: 400, marginTop: "70px"}}>

                <Form.Item label="Book Name" name="bookName"
                           rules={[{required: true, message: "Please input name of the book!"}]}>
                    <Input onChange={handleChange} name="bookName" value={credentials.bookName}/>
                </Form.Item>

                <Form.Item label="ISBN" name="bookIsbn"
                           rules={[{required: true, message: "Please input ISBN of the book!"}]}>
                    <Input onChange={handleChange} name="bookIsbn" value={credentials.bookIsbn}/>
                </Form.Item>

                <Form.Item label="Genre" name="genreName"
                           rules={[{required: true, message: "Please select the genre of the Book!"}]}>
                    <Select style={{width: 120}} allowClear onChange={handleGenreChange}>
                        <Select.Option value="ACTION">Action</Select.Option>
                        <Select.Option value="CLASSIC">Classic</Select.Option>
                        <Select.Option value="FANTASY">Fantasy</Select.Option>
                        <Select.Option value="HORROR">Horror</Select.Option>
                        <Select.Option value="ROMANCE">Romance</Select.Option>
                        <Select.Option value="SCI_FI">Sci-Fi</Select.Option>
                        <Select.Option value="HISTORY">History</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Request;