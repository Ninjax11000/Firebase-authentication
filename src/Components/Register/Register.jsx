import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
    const [hide, setHide] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const handleHide = () => {
        setHide(!hide);
    }

    const handlesubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Add two uppercases');
            return;
        }
        console.log(name, email, password);
        setSuccess('');
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                const loggedUser = result.user;
                updateProfile(loggedUser, {
                    displayName: name
                })
                    .then(result2 => {
                        console.log(result2);
                    });
                setSuccess('User created successfully!');
                sendEmailVerification(loggedUser)
                    .then(alert('please confirm in your email.'))
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message);
            })

    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col w-1/2">
                    <div className="text-center my-5">
                        <h1 className="text-5xl font-bold">Register now!</h1>

                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handlesubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={hide ? "password" : "text"} placeholder="password" name='password' className="input input-bordered" required />
                                <div onClick={handleHide} className='flex'>
                                    {hide ?
                                        <>
                                            <h2 className='text-sm mx-1'>Show password </h2>
                                            <span className='mt-1'>< FaEye /></span>
                                        </>
                                        :
                                        <>
                                            <h2 className='text-sm mx-1'>Hide password </h2>
                                            <span className='mt-1'>< FaEyeSlash /></span>
                                        </>

                                    }
                                </div>

                                <label className="label">
                                    <h2>Already have an account? <Link className='link-primary' to='/login'>Login!</Link> </h2>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className='btn btn-primary' type="submit" value="Register" />
                            </div>
                            <p className='text-success ms-5 mb-3'>{success}</p>
                            <p className='text-warning ms-5 mb-3'>{error}</p>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;