import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Form, Input, Select} from "antd";
import UserService from "../../service/user/UserService";
import LocalStorageUtil from "../../util/SessionStorageUtil";
import Password from "antd/es/input/Password";
import AuthorService from "../../service/author/AuthorService";
import BookService from "../../service/book/BookService";
import {ToastContainer} from "react-toastify";
import React from "react";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";

const UpdateBook = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [credentials, setCredentials] = useState({
        id: location.state.value.id,
        name: location.state.value.name,
        isbn: location.state.value.isbn,
        genreName: location.state.value.genre.name,
    })



    const onFinish = async () => {
        await BookService.updateBook(credentials);
        ToastifyUtil.success(MessageUtil.updateBookSuccess())
        await ToastifyUtil.sleep(1500)
        navigate('/admin-books')
    };


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
            <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={
                {
                    name: credentials.name,
                    isbn: credentials.isbn,
                    genreName: credentials.genreName
                }
            }
                  onFinish={onFinish} onFinishFailed={onFinishFailed}
                  style={{margin: "0 auto", width: 400, marginTop: "70px"}}>

                <Form.Item label="Name" name="name"
                           rules={[{required: true, message: "Please input your name!"}]}>
                    <Input onChange={handleChange} name="name" value={credentials.name}/>
                </Form.Item>

                <Form.Item label="ISBN" name="isbn"
                           rules={[{required: true, message: "Please input your name!"}]}>
                    <Input onChange={handleChange} name="isbn" value={credentials.isbn}/>
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

            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default UpdateBook;