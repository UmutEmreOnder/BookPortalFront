import {useEffect, useState} from "react";
import ToastifyUtil from "../util/ToastifyUtil";
import {useLocation, useNavigate} from "react-router-dom";
import VerifyService from "../service/VerifyService"

const Verify = () => {
    const navigate = useNavigate();
    const [state, setState] = useState();

    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');

    useEffect(() => {
        verify();
        sleepThenNavigate();
    }, [])

    const sleepThenNavigate = async () => {
        await ToastifyUtil.sleep(3000)
        navigate('/')
    }

    const verify = async () => {
        VerifyService.verify(token).then(value => setState({value: value.data}));
    }

    return (
        <div style={{textAlign: "center", marginTop: "100px"}}>
            <h1>{state?.value}</h1>
            <br/> <br/> <br/>
            <h3>You will be sent to home page in 3 seconds...</h3>
        </div>
    )
}

export default Verify;