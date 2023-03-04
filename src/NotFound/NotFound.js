import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div style={{ marginLeft: '470px' }} className="not-found">
        <Link to="/" className="link-home">
            <img style={{ width: 500 }} src='https://st2.depositphotos.com/33945136/41968/v/600/depositphotos_419680816-stock-illustration-error-403-icon-style-webpage.jpg' />
        </Link>
    </div>
);

export default NotFound;