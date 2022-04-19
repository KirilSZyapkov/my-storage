import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import errorHandler from '../services/errorHandler';

function Register() {
    const [error, setError] = useState(null);
    const [loading, setLoaing] = useState(false);
    const { register } = useAuth();
    const navigation = useNavigate();

    async function handlerSubmit(e) {
        e.preventDefault();
        setLoaing(true);
        const target = e.target;
        const email = target.email.value;
        const password = target.password.value;
        const rePass = target.rePass.value;


        try {
            if (password !== rePass) {
                throw new Error('Passwords don`t match!');
            }

            await register(email.trim(), password.trim());
            setLoaing(false);
            navigation('/');

        } catch (err) {
           
            setError(errorHandler(err));
            setLoaing(false);
        }
    }


    return (
        <div className="container-form">
            <form onSubmit={handlerSubmit}>
                <div className="wrapper-register">
                    <h1>Register</h1>
                    {error && <div className='register-error-container'>
                        <h1 className='register-error-message'>{error}</h1>
                    </div>}
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" required />

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" required />

                    <label htmlFor="rePass"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="rePass" id="rePass" required />
                    <hr />

                    <button disabled={loading} type="submit" className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <Link to={'/login'}>Sign in</Link>.</p>
                </div>
            </form>
        </div>
    )
}

export default Register;