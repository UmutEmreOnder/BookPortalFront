import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Form, Input} from "antd";
import AuthorService from "../../service/author/AuthorService";
import {ToastContainer} from "react-toastify";
import React from "react";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import {useEffect} from "react";

const CreateAuthor = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});

    const onFinish = async (values) => {
        const response = await AuthorService.register(credentials);

        if (response) {
            ToastifyUtil.success(MessageUtil.createAuthorSuccess())
            navigate('/admin-authors')
        } else {
            ToastifyUtil.error(MessageUtil.createAuthorFailed())
        }
    };

    useEffect(() => {
        if (!canLoad()) {
            ToastifyUtil.error(MessageUtil.noPermission())
            navigate('/restriction')
        }
    }, [])

    const canLoad = () => {
        return SessionStorageUtil.getUser()?.roles[0].id === 1;
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

    return (
        <>
            <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={{remember: true}}
                  onFinish={onFinish} onFinishFailed={onFinishFailed}
                  style={{margin: "0 auto", width: 400, marginTop: "70px"}}>

                <Form.Item label="Name" name="name"
                           rules={[{required: true, message: "Please input your name!"}]}>
                    <Input onChange={handleChange} name="name" value={credentials.name}/>
                </Form.Item>

                <Form.Item label="Surname" name="surname"
                           rules={[{required: true, message: "Please input your surname!"}]}>
                    <Input onChange={handleChange} name="surname" value={credentials.surname}/>
                </Form.Item>

                <Form.Item label="Age" name="age"
                           rules={[{required: true, message: "Please input your age!"}]}>
                    <Input onChange={handleChange} name="age" value={credentials.age}/>
                </Form.Item>

                <Form.Item label="Email" name="email"
                           rules={[{required: true, message: "Please input your email!"}]}>
                    <Input onChange={handleChange} name="email" value={credentials.email}/>
                </Form.Item>

                <Form.Item label="Username" name="username"
                           rules={[{required: true, message: "Please input your username!"}]}>
                    <Input onChange={handleChange} name="username" value={credentials.username}/>
                </Form.Item>

                <Form.Item label="Password" name="password"
                           rules={[{required: true, message: "Please input your password!"}]}>
                    <Input.Password onChange={handleChange} name="password" value={credentials.password}/>
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

export default CreateAuthor;