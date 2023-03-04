import React, { useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import './Login.scss'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [msgErr, setMsgErr] = useState(false)

    const handleLogin = () => {
        console.log(username, password)
        axios.post('http://localhost:4000/api/user/login', {
            username, password
        })
            .then(function (res) {
                console.log(res)
                if (res.status == 200) {
                    localStorage.setItem('token', res.data.token);

                    window.location = '/'
                }
            })
            .catch(function (error) {
                console.log(error)
                setMsgErr(true)
                document.querySelector('body').addEventListener('click', () => {
                    setMsgErr(false)
                });
            });
    }


    return (
        <div>
            <Header />
            <div className='formLogin'>
                <div className='form'>
                    <h1>LOGIN</h1>
                    <br />
                    <input
                        value={username}
                        placeholder='Enter username'
                        onChange={e => { setUsername(e.target.value) }}
                    /> <br /><br /><br />
                    <input
                        type={'password'}
                        placeholder='Enter password'
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    /><br /><br /><br />

                    {username == '' || password == '' ? (
                        <>
                            <button style={{ backgroundColor: 'gray' }}>
                                <span>Login </span>
                            </button> <br /><br />
                        </>
                    ) : (
                        <>
                            <button onClick={handleLogin}>
                                <span>Login </span>
                            </button> <br /><br /></>
                    )}

                    <p>
                        If you don't have an account ?
                        <span>
                            <Link to={'/signup'}>
                                Signup here
                            </Link>
                        </span>
                    </p>
                </div>
                {msgErr ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i className="fa-solid fa-circle-exclamation fa-2x"></i>
                            <br></br>
                            <p>The account or password is incorrect, please check again !!</p>
                        </div>
                    </div>
                ) : ('')}
            </div>
            <Footer />
        </div>
    )
}

export default Login