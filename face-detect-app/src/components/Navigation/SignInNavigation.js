import React from 'react';
import './SignIn.css';

const SignInNavigation = ({ onRouteChange, isSignedIn }) => {
    return ((isSignedIn ?
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p
                onClick={() => onRouteChange('signOut')}
                className="f3 dim black underline pa3 pointer">Sign Out</p>
        </nav>
        :
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p
                onClick={() => onRouteChange('signIn')}
                className="f3 dim black underline pa3 pointer">Sign In</p>
            <p
                onClick={() => onRouteChange('register')}
                className="f3 dim black underline pa3 pointer">Register</p>
        </nav>

    ));
}

export default SignInNavigation; 