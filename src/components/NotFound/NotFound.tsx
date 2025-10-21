import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundStyles } from './NotFound.styles.ts';

const NotFound = () => {
    return (
        <div className={NotFoundStyles.container}>
            <h1 className={NotFoundStyles.title}>Page not found</h1>
            <p className={NotFoundStyles.paragraph}>
                Go back to <Link to="/" className={NotFoundStyles.link}>Home</Link>.
            </p>
        </div>
    );
}

export default NotFound;

