import React, { useContext, useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Password } from 'primereact/password';
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
//import {handleClose} from "./pop";
function Login(props) {

    const navigate = useNavigate();

    const [userName, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const [err, setErr] = useState(null);


    const { login } = useContext(AuthContext);


    const handleLogin = async () => {
        //e.preventDefault();
        try {
            await login({ userName, password })
            navigate("/home")
        } catch (err) {
            setErr(err.response.data?.message);
        }
        props.close()
    };



    return (
        <>
            <div className="divlogin">
                <input
                    id="uname"
                    type="text"
                    name="Username"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="input-field"
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <br />
                {err && <span className="error-message">{err}</span>}
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    className="submit-button"
                >
                    Login
                </Button>
                <br />
                {/* <a href="#" className="forgot-password-link">Forgot Password</a> */}
            </div>

        </>
    )
}
export default Login;
