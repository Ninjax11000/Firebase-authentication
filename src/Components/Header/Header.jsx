import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='text-center'>
            <h2 className='font-bold text-4xl text-yellow-500'>Welcome to firebase auth system!</h2>
            <Link to='/'><button className="btn btn-primary mx-5 my-5">Home</button> </Link>
            <Link to='/login'> <button className="btn btn-secondary mx-5 my-5"> Login</button> </Link>
            <Link to='/register'><button className="btn btn-accent mx-5 my-5">Register</button> </Link>
            
           
            
        </div>
    );
};

export default Header;