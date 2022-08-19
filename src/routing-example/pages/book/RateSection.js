import {Rate} from "antd";
import UserBookService from "../../service/user/UserBookService";
import {useEffect, useState} from "react";

const RateSection = (bookId) => {
    const [rate, setRate] = useState(0);

    useEffect(() => {
        getCurrentRate();
    }, [])

    const getCurrentRate = async () => {
        UserBookService.fetchRate(bookId.bookId).then(async value => await setRate(value));
    }

    const onChange = async (value) => {
        await UserBookService.addRate(bookId.bookId, value);
    }

    return (
        <Rate defaultValue={rate} onChange={(value) => onChange(value)}></Rate>
    )
}

export default RateSection;