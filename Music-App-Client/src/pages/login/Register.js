
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-indigo/theme.css";

function Register(props) {


    const [userName, setuserName] = useState(null)
    const [password, setpassword] = useState(null)
    const [email, setemail] = useState(null)

    const submit = async () => {
        console.log(userName);
        try {
            const token = await fetch('http://localhost:3600/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userName: userName, password: password, email: email })
            })

            console.log(token);

        }
        catch (e) {
        }
    }


    return (
        <>
            <div className="divlogin">
                <input
                    id="uname"
                    type="text"
                    name="Username"
                    placeholder="Username"
                    onChange={(e) => setuserName(e.target.value)}
                    className="input-field"
                />
                <br />
                <div className="card flex justify-content-center">
                    <Password
                        password={password}
                        placeholder="Password"
                        onChange={(e) => setpassword(e.target.value)}
                        toggleMask
                        className="input-field"
                    />
                </div>
                <input
                    id="email"
                    type="email"
                    name="Email"
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                    className="input-field"
                />
                <br />
                <Button
                    variant="contained"
                    onClick={submit}
                    className="submit-button"
                >
                    SignUp
                </Button>
                <br />
            </div>

        </>
    )






}

export default Register