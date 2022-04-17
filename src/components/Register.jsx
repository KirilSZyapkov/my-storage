import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="container-register">
            <form>
                <div className="wrapper-register">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" required />

                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" required />

                    <label for="rePass"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="rePass" id="rePass" required />
                    <hr />

                    <button type="submit" className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <Link to={'/login'}>Sign in</Link>.</p>
                </div>
            </form>
        </div>
    )
}

export default Register;