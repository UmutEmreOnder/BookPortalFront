import {Form, Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AuthService from "../service/AuthService";
import LocalStorageUtil from "../util/LocalStorageUtil";
import UserService from "../service/UserService";

const Home = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [state, setState] = useState({});

    const onFinish = async (values) => {
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
            return (state.value.roles[0].id === 1 ? welcomeAuthor({state, navigate}) : welcomeUser({state, navigate}))
        }
    }

    return (result({onFinish, onFinishFailed, handleChange, credentials}));
};

function welcomeUser({state, navigate}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => {
                    if(state.value.roles[0].id === 2) {
                        navigate('/user-books')
                    } else {
                        navigate('/author-books')
                    }
                }}>Search Books</Button>
                <Button onClick={() => navigate('/update-profile')}>Update Profile</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button onClick={() => {LocalStorageUtil.clearToken(); navigate('/')}}>Log Out</Button>
        </div>
    )
}

function welcomeAuthor({state, navigate}) {
    return (
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center", marginTop: "70px"}}>
                <h2>Welcome, {state.value?.name} {state.value?.surname}</h2>
                <br/>
                <Button style={{marginRight: "25px"}} onClick={() => {navigate('/admin-books')}}>Search Books</Button>
            </div>
            <br/> <br/> <br/> <br/>
            <Button onClick={() => {LocalStorageUtil.clearToken(); navigate('/')}}>Log Out</Button>
        </div>
    )
}


export default Home;
