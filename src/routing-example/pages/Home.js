import {Form, Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AuthService from "../service/AuthService";
import SessionStorageUtil from "../util/SessionStorageUtil";
import UserService from "../service/user/UserService";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import ToastifyUtil from "../util/ToastifyUtil";
import MessageUtil from "../util/MessageUtil";

const Home = () => {
    const navigation = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [user, setUser] = useState({});

    const onFinish = async () => {
        let response;
        await AuthService.signin(credentials).then(value => {setUser({value}); response = value});

        if (response) {
            navigation('/')
            ToastifyUtil.success(MessageUtil.loginSuccess());
        } else {
            ToastifyUtil.error(MessageUtil.loginFailed());
        }
    };

    useEffect(() => {
        UserService.getUser()?.then(value => SessionStorageUtil.setUser(value))
        const value = SessionStorageUtil.getUser();
        setUser({value})
    }, [])

    useEffect(() => {
        if(user.value) {
            SessionStorageUtil.setUser(user.value)
        }
    }, [user])


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
                </>
            )
        } else {
            const id = user?.value?.roles[0]?.id;
            if(id === 1) {
                return welcomeAdmin({user, setUser, navigation})
            } else if (id === 2) {
                return welcomeUser({user, setUser, navigation})
            } else {
                return welcomeAuthor({user, setUser, navigation})
            }
        }
    }

    return (result({onFinish, onFinishFailed, handleChange, credentials}));
};


function welcomeUser({user, setUser, navigation}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {user.value?.name} {user.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/user-books')}>Search Books</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/user-read')}>Your Read List</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/user-favorite')}>Your Favorite List</Button>
                <Button onClick={() => navigation(`/user-update`, {user})}>Update Profile</Button>
            </div>

            <br/> <br/> <br/> <br/>
            <Button onClick={() => {
                SessionStorageUtil.clearToken();
                SessionStorageUtil.clearUser();
                ToastifyUtil.info(MessageUtil.logOut())
                navigation('/')
                setUser({})
            }}>Log Out</Button>
        </div>
    )
}

function welcomeAuthor({user, setUser, navigation}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {user.value?.name} {user.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/author-books')}>Your Books</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/author-request')}>Your Requests</Button>
                <Button style={{marginRight: "25px"}} onClick={() => navigation('/add-request')}>Add a Request</Button>
                <Button onClick={() => navigation('/author-update', {user})}>Update Profile</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button onClick={() => {
                SessionStorageUtil.clearToken();
                navigation('/')
                setUser({})
            }}>Log Out</Button>
        </div>
    )
}

function welcomeAdmin({user, setUser, navigation}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {user.value?.name} {user.value?.surname}</h2>
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
                setUser({})
            }}>Log Out</Button>
        </div>
    )
}


export default Home;
