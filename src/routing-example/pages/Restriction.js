import {useEffect} from "react";
import ToastifyUtil from "../util/ToastifyUtil";
import {useNavigate} from "react-router-dom";

const Restriction = () => {
    const navigate = useNavigate();

    useEffect(() => {
        test();
    }, [])

    const test = async () => {
        await ToastifyUtil.sleep(3000)
        navigate('/')
    }

    return (
        <div style={{textAlign: "center", marginTop: "100px"}}>
            <h1>You don't have permission to go to this page.</h1>
            <br/> <br/> <br/>
            <h3>You will be sent to home page in 3 seconds...</h3>
        </div>
    )
}

export default Restriction