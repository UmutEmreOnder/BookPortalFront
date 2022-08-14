import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import UserService from "../../service/user/UserService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import SessionStorageService from "../../util/SessionStorageUtil";
import sessionStorageUtil from "../../util/SessionStorageUtil";
import SessionStorageUtil from "../../util/SessionStorageUtil";

const UpdateUser = () => {
    const navigate = useNavigate();
    const {id, name, surname, age, email, username} = sessionStorageUtil.getUser();

    const [credentials, setCredentials] = useState({
        id: id,
        name: name,
        surname: surname,
        age: age,
        email: email,
        username: username,
    });

    useEffect(() => {
        if (!canLoad()) {
            ToastifyUtil.error(MessageUtil.noPermission())
            navigate('/restriction')
        }
    }, [])

    const canLoad = () => {
        return SessionStorageUtil.getUser()?.roles[0].id === 2;
    }

    const onFinish = async () => {
        const response = await UserService.updateUser(credentials);

        if (response) {
            ToastifyUtil.success(MessageUtil.updateProfileSuccess())

            if (credentials.username !== username) {
                ToastifyUtil.info(MessageUtil.logOut())
                SessionStorageService.clearToken()
                SessionStorageService.clearUser()
            }

            await setUserToken();
            navigate('/')
        } else {
            ToastifyUtil.error(MessageUtil.updateProfileFailed())
        }
    };

    const setUserToken = async () => {
        const response = await UserService.getUser();
        SessionStorageService.setUser(response)
    }

    const onFinishFailed = () => {
        ToastifyUtil.info(MessageUtil.updateFailed())
    };

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={
                {
                    name: credentials.name,
                    surname: credentials.surname,
                    email: credentials.email,
                    age: credentials.age,
                    username: credentials.username
                }
            }
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

                <Form.Item label="Email" name="email"
                           rules={[{required: true, message: "Please input your email!"}]}>
                    <Input onChange={handleChange} name="email" value={credentials.email}/>
                </Form.Item>

                <Form.Item label="Age" name="age"
                           rules={[{required: true, message: "Please input your age!"}]}>
                    <Input onChange={handleChange} name="age" value={credentials.age}/>
                </Form.Item>

                <Form.Item label="Username" name="username"
                           rules={[{required: true, message: "Please input your username!"}]}>
                    <Input onChange={handleChange} name="username" value={credentials.username}/>
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

export default UpdateUser;