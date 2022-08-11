import {Form, Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AuthService from "../service/AuthService";
import LocalStorageUtil from "../util/LocalStorageUtil";
import UserService from "../service/user/UserService";
import React from "react";

const Home = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [state, setState] = useState({});

    const onFinish = async () => {
        const response = await AuthService.signin(credentials);

        if (response) {
            window.location.reload();
        } else {
            console.log("Boyle bi user yok")
        }
    };

    useEffect(() => {
        UserService.getUser?.then(value => setState({value}))
    }, [])


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    const result = ({onFinish, onFinishFailed, handleChange, credentials}) => {
        if(!LocalStorageUtil.getToken()) {
            return (
                <>
                    <div style={{textAlign: "right", marginRight: "200px"}}>
                        <Button onClick={() => navigate('/')} style={{marginRight: "25px"}}>Login</Button>
                        <Button onClick={() => navigate('/register')}>Register</Button>
                    </div>
                    <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} style={{margin: "0 auto", width: 400, marginTop: "70px"}}>
                        <Form.Item label="Username" name="username" rules={[{required: true, message: "Please input your username!"}]}>
                            <Input onChange={handleChange} name="username" value={credentials.username}/>
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{required: true, message: "Please input your password!"}]}>
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
        } else {
            const id = state?.value?.roles[0]?.id;
            if(id === 1) {
                return welcomeAdmin({state, setState, navigate})
            } else if (id === 2) {
                return welcomeUser({state, setState, navigate})
            } else {
                return welcomeAuthor({state, setState, navigate})
            }
        }
    }

    return (result({onFinish, onFinishFailed, handleChange, credentials}));
};

function welcomeUser({state, setState, navigate}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => navigate('/user-books')}>Search Books</Button>
                <Button onClick={() => navigate('/update-profile')}>Update Profile</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button onClick={() => {
                LocalStorageUtil.clearToken();
                navigate('/')
                setState({})
            }}>Log Out</Button>
        </div>
    )
}

function welcomeAuthor({state, setState, navigate}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => navigate('/author-books')}>Your Books</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigate('/author-request')}>Your Requests</Button>
                <Button onClick={() => navigate('/update-profile')}>Update Profile</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button onClick={() => {
                LocalStorageUtil.clearToken();
                navigate('/')
                setState({})
            }}>Log Out</Button>
        </div>
    )
}

function welcomeAdmin({state, setState, navigate}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => {navigate('/admin-user')}}>List Books</Button>
                <Button style={{marginRight: "25px"}} onClick={() => {navigate('/admin-users')}}>List Users</Button>
                <Button style={{marginRight: "25px"}} onClick={() => {navigate('/admin-authors')}}>List Authors</Button>
                <Button style={{marginRight: "25px"}} onClick={() => {navigate('/admin-requests')}}>List Requests</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button onClick={() => {
                LocalStorageUtil.clearToken();
                navigate('/');
                setState({})
            }}>Log Out</Button>
        </div>
    )
}


export default Home;
