import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>My Favorite Books</Navbar.Brand>
            <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>

            {isAuthenticated && (
                <>
                    <NavItem><Link to="/About" className="nav-link">About</Link></NavItem>
                    <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
                    <NavItem><Link to="/books" className="nav-link">Books</Link></NavItem>
                </>
            )}

            <NavItem>
                {isAuthenticated 
                    ? <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
                    : <button onClick={() => loginWithRedirect()}>Login</button>}
            </NavItem>
        </Navbar>
    );
};

export default Header;

