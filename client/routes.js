import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup } from "./components";
import { me } from "./store";

class Routes extends React.Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const { isLoggedIn } = this.props;
        console.log(isLoggedIn);

        return (
            <Switch>
                <Route path="/login" component={Login} />
            </Switch>
        )
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatch = dispatch => {
    return {
        loadInitialData() {
            dispatch(me())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Routes));
