import React from 'react';
import { useAuth } from '../context/AuthContext';

function HomePage() {

    const { logout } = useAuth();
    return (
        <>
            <div className="home-page-topnav">
                <div className="home-page-logo">M Y <span className='storage'>S T O R A G E</span></div>
                <div onClick={() => logout()} className='home-page-topnav-logout-button'>L O G O U T</div>
            </div>
            <div className="home-page-breadcrumb">
                <div className="breadcrumb-container">
                    <ul className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Pictures</a></li>
                        <li><a href="#">Summer 15</a></li>
                    </ul>
                </div>
                <div className="breadcrumb-buttons">
                    <button className="breadcrumb-buttons-file">New File</button>
                    <button className="breadcrumb-buttons-folder">New Folder</button>
                </div>
            </div>
            <hr/>
        </>
    )
}

export default HomePage