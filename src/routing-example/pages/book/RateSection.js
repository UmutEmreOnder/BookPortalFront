import {Rate} from "antd";
import UserBookService from "../../service/user/UserBookService";

const RateSection = (bookId) => {
    const getCurrentRate = async () => {
        return await UserBookService.fetchRate(bookId.bookId);
    }

    const onChange = async (value) => {
        await UserBookService.addRate(bookId.bookId, value);
    }

    return (
        <Rate defaultValue={getCurrentRate()} onChange={(value) => onChange(value)}></Rate>
    )
}

export default RateSection;