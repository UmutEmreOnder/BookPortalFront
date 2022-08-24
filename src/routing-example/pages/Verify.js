import React, {useEffect, useState} from "react";
import ToastifyUtil from "../util/ToastifyUtil";
import {useLocation, useNavigate} from "react-router-dom";
import VerifyService from "../service/VerifyService"
import {Button, Form, Input} from "antd";
import MessageUtil from "../util/MessageUtil";

const Verify = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({});
    const [credentials, setCredentials] = useState({})

    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');

    useEffect(() => {
        verify().then((value) => {
            setState({value})

            if (value === true) {
                sleepThenNavigate()
            }
        })
    }, [])

    const sleepThenNavigate = async () => {
        await ToastifyUtil.sleep(3000)
        navigate('/')
    }

    const verify = async () => {
        return await VerifyService.verify(token);
    }

    const onFinish = async () => {
        const response = await VerifyService.createNewMail(credentials.email);

        if (response) {
            navigate('/')
            ToastifyUtil.success(MessageUtil.sentSuccess());
        } else {
            ToastifyUtil.error(MessageUtil.sentFail());
        }
    };

    const onFinishFailed = () => {
        ToastifyUtil.error(MessageUtil.updateFailed())
    };

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };


    return (
        state?.value === true ? Success() : Fail({navigate, onFinish, onFinishFailed, handleChange, credentials})
    )
}

function Success() {
    return (
        <div style={{textAlign: "center", marginTop: "30px"}}>
            <h1>You have successfully verified your account!</h1>
            <br/> <br/> <br/>
            <h3>You will be sent to home page in 3 seconds...</h3>
        </div>
    )
}

function Fail({onFinish, onFinishFailed, handleChange, credentials}) {
    return (
        <div style={{textAlign: "center", marginTop: "30px"}}>
            <h1>The Token Is Expired or Incorrect!</h1>
            <br/> <br/> <br/>
            <h3>If you think there is a mistake, you can enter your email address in the form below and get a new
                link!</h3>

            <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={{remember: true}}
                  onFinish={onFinish} onFinishFailed={onFinishFailed}
                  style={{margin: "auto", width: 400, marginTop: "80px"}}>

                <Form.Item label="Email" name="email"
                           rules={[{required: true, message: "Please input your email!"}]}
                           style={{marginRight: "90px"}}>
                    <Input onChange={handleChange} name="email" value={credentials.email}/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}} style={{marginRight: "100px"}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}


export default Verify;