import React from 'react';
import { useAuth } from '../context/AuthContext';

function HomePage() {

    const { logout } = useAuth();
    return (
        <>
            <div className="home-page-topnav">
                <div className="home-page-logo">M Y  S T O R A G E</div>

                <div onClick={() =>  logout() } className='home-page-topnav-logout-button'>L O G O U T</div>
            </div>
        </>
    )
}

export default HomePage