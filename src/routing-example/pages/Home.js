import {Form, Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AuthService from "../service/AuthService";
import SessionStorageUtil from "../util/SessionStorageUtil";
import UserService from "../service/user/UserService";
import React from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ToastifyUtil from "../util/ToastifyUtil";
import MessageUtil from "../util/MessageUtil";

const Home = () => {
    const navigation = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [state, setState] = useState({});

    const onFinish = async () => {
        const response = await AuthService.signin(credentials);

        if (response) {
            ToastifyUtil.success(MessageUtil.loginSuccess());
            await ToastifyUtil.sleep(2000);
            window.location.reload()
        } else {
            ToastifyUtil.error(MessageUtil.loginFailed());
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
        if(!SessionStorageUtil.getToken()) {
            return (
                <>
                    <div style={{textAlign: "right", marginRight: "200px"}}>
                        <Button onClick={() => navigation('/')} style={{marginRight: "25px"}} disabled={true}>Login</Button>
                        <Button onClick={() => navigation('/register')}>Register</Button>
                    </div>
                    <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} style={{margin: "0 auto", width: 400, marginTop: "70px"}}>
                        <Form.Item label="Username" name="username" rules={[{required: true, message: "Please input your username!"}]}>
                            <Input onChange={handleChange} name="username" value={credentials.username}/>
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{required: true, message: "Please input your password!"}]}>
                            <Input.Password onChange={handleChange} name="password" value={credentials.password}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">Submit</Button>
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
        } else {
            const id = state?.value?.roles[0]?.id;
            if(id === 1) {
                return welcomeAdmin({state, setState, navigation})
            } else if (id === 2) {
                return welcomeUser({state, setState, navigation})
            } else {
                return welcomeAuthor({state, setState, navigation})
            }
        }
    }

    return (result({onFinish, onFinishFailed, handleChange, credentials}));
};


function welcomeUser({state, setState, navigation}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/user-books')}>Search Books</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/user-read')}>Your Read List</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/user-favorite')}>Your Favorite List</Button>
                <Button onClick={() => navigation(`/user-update`, {state})}>Update Profile</Button>
            </div>

            <br/> <br/> <br/> <br/>
            <Button onClick={() => {
                SessionStorageUtil.clearToken();
                navigation('/')
                setState({})
            }}>Log Out</Button>
        </div>
    )
}

function welcomeAuthor({state, setState, navigation}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/author-books')}>Your Books</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/author-request')}>Your Requests</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/add-request')}>Add a Request</Button>
                <Button onClick={() => navigation('/author-update', {state})}>Update Profile</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button onClick={() => {
                SessionStorageUtil.clearToken();
                navigation('/')
                setState({})
            }}>Log Out</Button>
        </div>
    )
}

function welcomeAdmin({state, setState, navigation}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => {navigation('/admin-books')}}>List Books</Button>
                <Button style={{marginRight: "25px"}} onClick={() => {navigation('/admin-users')}}>List Users</Button>
                <Button style={{marginRight: "25px"}} onClick={() => {navigation('/admin-authors')}}>List Authors</Button>
                <Button style={{marginRight: "25px"}} onClick={() => {navigation('/admin-requests')}}>List Requests</Button>
            </div>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <Button style={{marginRight: "60px"}} onClick={() => {navigation('/author-create')}}>Create Author</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button style={{marginRight: "60px"}} onClick={() => {
                SessionStorageUtil.clearToken();
                navigation('/');
                setState({})
            }}>Log Out</Button>
        </div>
    )
}


export default Home;
