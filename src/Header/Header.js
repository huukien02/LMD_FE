import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Header.scss'

function Header() {

    const token = localStorage.getItem("token");


    const [showMenu, setShowMenu] = useState(true)
    const [dataPet, setDataPet] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/listpet`)
            .then(res => setDataPet(res.data));
    }, []);

    let boxSearch = []
    dataPet.map((item) => {
        let check = item.name.toLowerCase().includes(search.toLowerCase())
        if (check == true) {
            boxSearch.push(item)
        }
    })





    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }

    const handleOverIcon = () => {
        document.querySelector('.item').style.width = '120px'
        document.querySelector('.item').style.transition = 'all 0.4s'
        document.querySelector('.item p').style.display = 'block'

        document.querySelector('.item').style.backgroundColor = '#cf2e2e'
    }

    const handleOutIcon = () => {
        document.querySelector('.item p').style.display = 'none'
        document.querySelector('.item').style.width = '30px'

        document.querySelector('.item').style.backgroundColor = 'gray'
    }

    const handleOverIcon_1 = () => {
        document.querySelector('.item_1').style.width = '120px'
        document.querySelector('.item_1').style.transition = 'all 0.4s'
        document.querySelector('.item_1 p').style.display = 'block'

        document.querySelector('.item_1').style.backgroundColor = '#cf2e2e'
    }

    const handleOutIcon_1 = () => {
        document.querySelector('.item_1 p').style.display = 'none'
        document.querySelector('.item_1').style.width = '30px'

        document.querySelector('.item_1').style.backgroundColor = 'gray'
    }

    const handleOverIcon_2 = () => {
        document.querySelector('.item_2').style.width = '120px'
        document.querySelector('.item_2').style.transition = 'all 0.4s'
        document.querySelector('.item_2 p').style.display = 'block'

        document.querySelector('.item_2').style.backgroundColor = '#cf2e2e'
    }

    const handleOutIcon_2 = () => {
        document.querySelector('.item_2 p').style.display = 'none'
        document.querySelector('.item_2').style.width = '30px'

        document.querySelector('.item_2').style.backgroundColor = 'gray'
    }


    const handleLogout = () => {
        if (window.confirm("Bạn muốn đăng xuất")) {
            localStorage.removeItem("token");
            window.location = '/'
        }
    }


    return (
        <div className='Header'>
            <div className='logo'>
                <Link to={`/`}>
                    <img src='https://azpet.com.vn/wp-content/uploads/2021/07/azpet.png' />
                </Link>
            </div>
            <div className='menu'>

                {showMenu ? (
                    <i onClick={handleShowMenu} className="fa-solid fa-bars fa-2x"></i>
                ) : (
                    <i onClick={handleShowMenu} className="fa-solid fa-x fa-2x"></i>
                )}
                <p>Danh mục sản phẩm</p>

                {showMenu ? ('') : (
                    <div className='boxMenu'>
                        <ul>
                            <li>
                                <img src='https://azpet.com.vn/wp-content/uploads/2021/06/cho-canh-1.png' />
                                <span>Tivi</span>
                            </li>
                            <li>
                                <img src='https://azpet.com.vn/wp-content/uploads/2021/06/meo-canh-1.png' />
                                <span>Tủ Lạnh</span>
                            </li>
                            <li>
                                <img src='https://azpet.com.vn/wp-content/uploads/2021/07/phu-kien-cho-meo-1.png' />
                                <span>Đồ điện tử khác</span>
                            </li>
                            {/* <li>
                                <img src='https://azpet.com.vn/wp-content/uploads/2021/06/spa-cho-meo-1.png' />
                                <span>Spa & Grooming</span>
                            </li>
                            <li>
                                <img src='https://azpet.com.vn/wp-content/uploads/2021/06/hop-tac-nhan-giong-cho-canh-1.png' />
                                <span>Hợp tác nhân giống</span>
                            </li> */}
                        </ul>
                    </div>
                )}


            </div>

            <div className='search'>
                <input
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Enter name . . .'
                />
                <i className="fa-solid fa-magnifying-glass"></i>
                <div className='listSearch'>
                    {boxSearch.length == 0 || boxSearch.length == dataPet.length ? ('') : (
                        <ul>
                            {boxSearch.map((item, index) => {
                                return (
                                    <Link to={`/detail/pet/${item._id}`}>
                                        <li>
                                            <img src={item.imageOne} />
                                            <span>{item.name}</span>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>


            <div className='text'>
                <i className="fa-solid fa-circle"></i>
                <p>Săn ưu đãi lên tới 5,000,000đ</p>
            </div>

            {token ? (
                <div onClick={handleLogout} className='login'>
                    <Link to=''>LOGOUT</Link>
                </div>
            ) : (
                <div className='login'>
                    <Link to='/login'>LOGIN</Link>
                </div>
            )}




            <div className='item' onMouseOver={handleOverIcon} onMouseOut={handleOutIcon} >
                <p>Messager </p>
                <i className="fa-brands fa-facebook-messenger "></i>
            </div>

            <div className='item_1' onMouseOver={handleOverIcon_1} onMouseOut={handleOutIcon_1}>
                <p>099876543 </p>
                <i className="fa-solid fa-phone-volume "></i>
            </div>

            <div className='item_2' onMouseOver={handleOverIcon_2} onMouseOut={handleOutIcon_2}>
                <p>Instagram </p>
                <i className="fa-brands fa-instagram "></i>
            </div>
            {/* 
            <div className='boxMessage'>
                <div className='header'>
                    <p>
                        Mr. Kiennn
                        <i className="fa-solid fa-poo"></i>
                    </p>
                    <span onClick={handleCloseBoxMessage}>x</span>
                </div>
                <div className='body'>
                    <p>
                        <img src='https://img.freepik.com/free-icon/user_318-804790.jpg?w=360' />
                        <span>Chuyên Viên AZPET</span>
                    </p><br></br>
                    <div className='messager'>
                        <img src='https://img.freepik.com/free-icon/user_318-804790.jpg?w=360' />
                        <p>
                            Mình cần xem video/ảnh, check giá chính xác các bé không ạ? <br></br>
                            P/s: Admin 😊
                        </p>
                    </div>

                </div>
                <div className='footer'>
                    <input
                        placeholder='Enter question . . .'
                    />
                    <i className="fa-solid fa-paper-plane"></i>
                </div>

            </div> */}
            <button className='btnOpenBox'>
                <Link to={'/mycart'}>
                    <i style={{ color: 'white' }} className="fa-solid fa-cart-shopping"></i>
                </Link>
            </button>
        </div>
    )
}

export default Header