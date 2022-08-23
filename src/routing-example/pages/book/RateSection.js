import {Rate} from "antd";
import UserBookService from "../../service/user/UserBookService";
import React from "react";

class RateSection extends React.Component {
    state = {
        rate: undefined
    }

    constructor(props) {
        super(props);
        this.getCurrentRate().then(value => this.setState({rate: value}));
    }

    getCurrentRate = async () => {
        return await UserBookService.fetchRate(this.props.bookid);
    }

    onChange = async (value) => {
        await UserBookService.addRate(this.props.bookid, value);
    }

    render() {
        if (this.state.rate !== undefined) {
            return (
                <Rate defaultValue={this.state.rate} onChange={(value) => this.onChange(value)}></Rate>
            )
        }
    }
}

export default RateSection;