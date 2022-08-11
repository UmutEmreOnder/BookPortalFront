import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Dropdown, Form, Input, Menu, message, Select, Space} from "antd";
import AuthorRequestService from "../../service/author/AuthorRequestService";
import {DownOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const menu = (
    <Menu
        onClick={handleMenuClick}
        items={[
            {
                label: 'Action',
                key: 'ACTION',
            },
            {
                label: 'Classic',
                key: 'CLASSIC',
            },
            {
                label: 'Fantasy',
                key: 'FANTASY',
            },
            {
                label: 'Horror',
                key: 'HORROR',
            },
            {
                label: 'Romance',
                key: 'ROMANCE',
            },
            {
                label: 'Sci-Fi',
                key: 'SCI_FI',
            },
            {
                label: 'History',
                key: 'HISTORY',
            },

        ]}
    />
);

const Request = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});

    const onFinish = async () => {
        const response = await AuthorRequestService.create(credentials);

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

    const handleGenreChange = (event) => {
        setCredentials({
            ...credentials,
            genreName: event
        })
    }

    return (
        <>
            <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={{remember: true}}
                  onFinish={onFinish} onFinishFailed={onFinishFailed}
                  style={{margin: "0 auto", width: 400, marginTop: "70px"}}>

                <Form.Item label="Book Name" name="bookName"
                           rules={[{required: true, message: "Please input name of the book!"}]}>
                    <Input onChange={handleChange} name="bookName" value={credentials.bookName}/>
                </Form.Item>

                <Form.Item label="ISBN" name="bookIsbn"
                           rules={[{required: true, message: "Please input ISBN of the book!"}]}>
                    <Input onChange={handleChange} name="bookIsbn" value={credentials.bookIsbn}/>
                </Form.Item>

                <Form.Item label="Genre" name="genreName"
                           rules={[{required: true, message: "Please select the genre of the Book!"}]}>
                    <Select style={{width: 120}} allowClear onChange={handleGenreChange}>
                        <Select.Option value="ACTION">Action</Select.Option>
                        <Select.Option value="CLASSIC">Classic</Select.Option>
                        <Select.Option value="FANTASY">Fantasy</Select.Option>
                        <Select.Option value="HORROR">Horror</Select.Option>
                        <Select.Option value="ROMANCE">Romance</Select.Option>
                        <Select.Option value="SCI_FI">Sci-Fi</Select.Option>
                        <Select.Option value="HISTORY">History</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>

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

export default Request;