import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Form, Input} from "antd";
import UserService from "../../service/user/UserService";
import LocalStorageUtil from "../../util/LocalStorageUtil";
import Password from "antd/es/input/Password";
import AuthorService from "../../service/author/AuthorService";

const UpdateAuthor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [credentials, setCredentials] = useState({
        id: location.state.value.id,
        name: location.state.value.name,
        surname: location.state.value.surname,
        age: location.state.value.age,
        email: location.state.value.email,
        username: location.state.value.username,
    });



    const onFinish = async () => {
        console.log(credentials)

        const response = await AuthorService.updateAuthor(credentials);

        if (response) {
            navigate('/')
        } else {
            console.log("Bi hata aldin ama nie?")
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

export default UpdateAuthor;