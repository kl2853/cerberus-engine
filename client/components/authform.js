import React from "react";

const AuthForm = (props) => {
    const { name, handleSubmit } = props;

    return (
        <div>
            <form onSubmit={handleSubmit} name={name}>
                <div>
                   <label htmlFor="email">
                       <small>Email</small>
                   </label> 
                   <input name="email" type="text" />
                </div>
            </form>
        </div>
    )
}