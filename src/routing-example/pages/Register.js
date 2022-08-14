import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import UserService from "../service/user/UserService";
import {Button, Form, Input} from "antd";
import ToastifyUtil from "../util/ToastifyUtil";
import MessageUtil from "../util/MessageUtil";

const Register = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});

    const onFinish = async () => {
        const response = await UserService.register(credentials);

        if (response) {
            ToastifyUtil.success(MessageUtil.registerSuccess())
            navigate('/')
        } else {
            ToastifyUtil.error(MessageUtil.registerFailed())
        }
    };

    const onFinishFailed = () => {
        ToastifyUtil.error(MessageUtil.registerFailed())
    };

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <div style={{textAlign: "right", marginRight: "200px"}}>
                <Button onClick={() => navigate('/')} style={{marginRight: "25px"}}>Login</Button>
                <Button onClick={() => navigate('/register')} disabled={true}>Register</Button>
            </div>
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
                <p style={{color: "gray", marginLeft: "150px"}}>Must be 3-20 characters long</p>
                <br/> <br/>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Register;