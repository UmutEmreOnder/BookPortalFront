import {Form, Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AuthService from "../service/AuthService";
import LocalStorageUtil from "../util/LocalStorageUtil";

const Home = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});

    const onFinish = async (values) => {
        const response = await AuthService.signin(credentials);

        if (response === "ROLE_USER") {
            navigate('/user-books');
        } else if (response === "ROLE_AUTHOR") {
            navigate('/author-books')
        } else {
            console.log("Boyle bi user yok")
        }
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

    function result ({onFinish, onFinishFailed, handleChange, credentials}) {
        if(!LocalStorageUtil.getToken()) {
            return (
                <Form
                    name="basic"
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{margin: "0 auto", width: 400, marginTop: "70px"}}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!"
                            }
                        ]}
                    >
                        <Input
                            onChange={handleChange}
                            name="username"
                            value={credentials.username}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                    >
                        <Input.Password
                            onChange={handleChange}
                            name="password"
                            value={credentials.password}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )
        } else {
            return (
                <div style={{textAlign: "center", marginTop: "70px"}}>
                    <h2>Already Logged In</h2>
                    <br/> <br/> <br/>
                    <Button onClick={() => {LocalStorageUtil.clearToken(); navigate('/')}}>Log Out</Button>
                </div>
            )
        }
    }

    return (result({onFinish, onFinishFailed, handleChange, credentials}));
};


export default Home;
