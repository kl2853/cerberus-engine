import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";

const AuthForm = (props) => {
    const { name, displayName, handleSubmit, error } = props;

    return (
        <div>
            <form id="authform" onSubmit={handleSubmit} name={name}>
                {(displayName === "SIGNUP") 
                ? <div className="inputfield">
                    <label htmlFor="username">
                       <small>USERNAME</small>
                    </label> 
                   <input name="username" type="text" />
                </div> 
                : null}
                <div className="inputfield">
                   <label htmlFor="email">
                       <small>EMAIL</small>
                   </label> 
                   <input name="email" type="text" />
                </div>
                <div className="inputfield">
                   <label htmlFor="password">
                       <small>PASSWORD</small>
                   </label> 
                   <input name="password" type="text" />
                </div>
                <div>
                    <button type="submit">{displayName}</button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
            </form>
        </div>
    )
}

const mapLoginState = state => {
    return {
        name: "login",
        displayName: "LOGIN",
        error: state.user.error
    }
}

const mapSignupState = state => {
    return {
        name: "signup",
        displayName: "SIGNUP",
        error: state.user.error
    }
}

const mapDispatch = dispatch => {
    return {
        handleSubmit(evt) {
            evt.preventDefault();
            const formName = evt.target.name;
            const username = evt.target.username.value || null;
            const email = evt.target.email.value;
            const password = evt.target.password.value;
            if(formName === "signup") dispatch(auth(username, email, password, formName));
            else dispatch(auth(email, password, formName));
        }
    }
}

export const Login = connect(mapLoginState, mapDispatch)(AuthForm);
export const Signup = connect(mapSignupState, mapDispatch)(AuthForm);
