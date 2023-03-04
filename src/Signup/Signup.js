import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Signup.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Signup() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [msgErr, setMsgErr] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState(false)

    const handleSignup = () => {
        axios.post('http://localhost:4000/api/user/signup', {
            email, username, password
        })
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    setMsgSuccess(true)
                    document.querySelector('body').addEventListener('click', () => {
                        setMsgSuccess(false)

                    });
                    setEmail('')
                    setUsername('')
                    setPassword('')
                }
            })
            .catch((error) => {
                setMsgErr(true)
                document.querySelector('body').addEventListener('click', () => {
                    setMsgErr(false)
                });
            });
    }
    return (
        <div>
            <Header />
            <div className='formSignup'>
                <div className='form'>
                    <h1>SIGNUP</h1>
                    <input
                        value={email}
                        placeholder='Enter email'
                        onChange={e => { setEmail(e.target.value) }}
                    /><br /><br />
                    <input
                        value={username}
                        placeholder='Enter username'
                        onChange={e => { setUsername(e.target.value) }}
                    /><br /><br />
                    <input
                        value={password}
                        type={'password'}
                        placeholder='Enter password'
                        onChange={e => { setPassword(e.target.value) }}
                    /><br /><br />

                    {email == '' || username == '' || password == '' ? (
                        <>
                            <button style={{ backgroundColor: 'gray' }}>
                                <span>Signup </span>
                            </button> <br /><br />
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup}>
                                <span>Signup </span>
                            </button> <br /><br /></>
                    )}
                    <br /><br />
                    <p>
                        Do you already have an account ?
                        <span>
                            <Link to={'/login'}>
                                Login here
                            </Link>
                        </span>
                    </p>
                </div>
                {msgErr ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i className="fa-solid fa-circle-exclamation fa-2x"></i>
                            <br></br>
                            <p>This name already has a user !!</p>
                        </div>
                    </div>
                ) : ('')}

                {msgSuccess ? (
                    <div className='notification'>
                        <div style={{ border: '4px solid greenyellow' }} className='modal'>
                            <i style={{ color: 'greenyellow' }} className="fa-solid fa-circle-check fa-2x"></i>
                            <br></br>
                            <p style={{ color: 'greenyellow' }}>Signup success !!</p>
                        </div>
                    </div>
                ) : ('')}
            </div>
            <Footer />
        </div>
    )
}

export default Signup