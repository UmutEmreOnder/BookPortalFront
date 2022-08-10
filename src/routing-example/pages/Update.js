import React from "react";

class Update extends React.Component {
    state = {
        loading: false,
        data: []
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = async (params = {}) => {
        this.setState({loading: true});

        const data = "empty";

        this.setState({
            loading: false,
            data: data
        });
    };

    render() {
        const {data, loading} = this.state;

        return (
            <h2>Update User Page</h2>
        )
    }
}

export default Update;