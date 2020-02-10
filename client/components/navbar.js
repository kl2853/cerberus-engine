import React from "react";
import { Link } from "react-router-dom";
// prop types for typechecking?

const Navbar = ({handleClick, isLoggedIn}) => (
    <div>
        <h1>Cerberus Engine</h1>
        <nav>
            <div className="navlink">
                <Link to="/rules">HOW TO PLAY</Link>
            </div>
            <div className="navLink">
                <Link to="/faq">FAQ</Link>
            </div>
            {isLoggedIn
            ? (
                <div classname="navLink">
                    <Link to="/myaccount">ACCOUNT DETAILS</Link>
                    <a href="#" onClick={handleClick}>
                        LOGOUT
                    </a>
                </div>
            )
            : (
            <div className="navLink">
                <Link to="/login">LOGIN</Link>
            </div>
            )}
        </nav>
    </div>
)

export default Navbar;