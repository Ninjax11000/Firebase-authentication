import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const auth = getAuth(app);



const Login = () => {
    const [hide, setHide] = useState(true);
    const [user, setUser] = useState(null);
    const handleHide = () => {
        setHide(!hide);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                const loggedUser = result.user;
                if(!loggedUser.emailVerified){
                    alert('Please verify your email!');
                    return;
                }
                alert('Login successfull!!');
                setUser(loggedUser);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                const loggedUser = result.user;
                setUser(loggedUser);
                alert('Welcome ' + loggedUser.displayName);
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    }

    const HandleGithubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                console.log(result.user);
                const loggedUser = result.user;
                setUser(loggedUser);
                alert('Welcome ' + loggedUser.displayName);
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    }
    const HandleFacebookSignIn = ()=>{
        signInWithPopup(auth, facebookProvider)
        .then(result => {
            console.log(result.user);
            const loggedUser = result.user;
            setUser(loggedUser);
            alert('Welcome ' + loggedUser.displayName);
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message);
        })
    }

    const handleSignout = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
                alert('Logout Successfull!!');
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            {user ?
                <>

                    <div className='text-center'>
                        <button onClick={handleSignout} className='btn btn-warning'>SignOut</button>
                    </div>
                </>

                :

                <>
                    <div className='flex flex-col md:flex-row items-center bg-base-200'>
                        <div className="hero min-h-screen w-1/2 ">
                            <div className="hero-content flex-col w-full">
                                <div className="text-center my-5">
                                    <h1 className="text-5xl font-bold">Login now!</h1>

                                </div>
                                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                    <form onSubmit={handleSubmit} className="card-body">
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


                                        </div>
                                        <div className="form-control mt-6">

                                            <input className='btn btn-primary' type="submit" value="Login" />
                                        </div>
                                        <label className="label">
                                            {/* <button className='btn-link mx-auto'>Forgot password?</button> */}
                                            <Link className='btn-link '>Forgot password?</Link>
                                        </label>
                                        <label className="label">
                                            <h2>New to Auth system? <Link className='link-primary' to='/register'>Register Here!</Link> </h2>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mx-3 md:mx-0 md:w-1/2  my-10'>
                            <div className='w-full md:w-2/3 mx-auto'>


                                <GoogleLoginButton onClick={handleGoogleLogin} />
                                <br />
                                <GithubLoginButton onClick={HandleGithubLogin} />
                                <br/>
                                <FacebookLoginButton onClick={HandleFacebookSignIn} />


                            </div>
                        </div>
                    </div>
                </>}
        </div>
    );
};

export default Login;