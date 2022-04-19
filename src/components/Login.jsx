import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import errorHandler from '../services/errorHandler';

function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoaing] = useState(false);
    const { login } = useAuth();
    const navigation = useNavigate();

    async function handlerSubmit(e) {
        e.preventDefault();
        const target = e.target;
        const email = target.email.value;
        const password = target.password.value;

        try {
            await login(email.trim(), password.trim());
            setLoaing(true);
            navigation('/');

        } catch (err) {
            setError(errorHandler(err));
            setLoaing(false);
        }
        
    }

    return (
        <div className="container-form">
            <form onSubmit={handlerSubmit}>
                <div className="wrapper-login">
                    <h1>Log in</h1>
                    {error && <div className='register-error-container'>
                        <h1 className='register-error-message'>{error}</h1>
                    </div>}
                    <p>Log in with your Email and Password.</p>
                    <hr />
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required />

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required />
                    < hr />
                    <button disabled={loading} type="submit">Login</button>

                </div>
                <div className="register-link">
                    <p>If you don't have an account <Link to={'/register'}>Register</Link></p>
                </div>

                <div className="forgot-password">
                    <p>Forgot <a href="#">password?</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login