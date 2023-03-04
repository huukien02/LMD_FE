import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Detailpet.scss'

function DetailPet() {
    const [detailPet, setDetailPet] = useState([])
    const [typeDog, setTypeDog] = useState([])
    const [typeCat, setTypeCat] = useState([])
    let { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/listpet/detail/${id}`)
            .then(res => setDetailPet(res.data));
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/listpet/type/tivi`)
            .then(res => setTypeDog(res.data));
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/listpet/type/fridge`)
            .then(res => setTypeCat(res.data));
    }, [id]);


    const handleOverImg = (img) => {
        document.querySelector('.detailPet .detail .left .top img').src = img
    }
    const handleOutImg = () => {
        document.querySelector('.detailPet .detail .left .top img').src = `${detailPet.imageOne}`
    }

    const addToCard = (product) => {

        let checkLogin = localStorage.getItem("token");
        if (checkLogin != null) {
            if (window.confirm("Add to cart")) {
                let list = localStorage.getItem("cart")
                    ? JSON.parse(localStorage.getItem("cart"))
                    : [];

                list.push(product);
                let toString = JSON.stringify(list);
                localStorage.setItem("cart", toString);
            }
        }
        else {
            alert('Vui lòng Login')
        }
    }




    return (
        <>
            {Object.keys(detailPet).length > 0 ? (
                <div>
                    <Header />
                    <div className='detailPet'>

                        <div className='detail'>
                            <div className='left'>
                                <div className='top'>
                                    <img src={detailPet.imageOne} />
                                </div>
                                <div className='bottom'>
                                    <img onMouseOver={() => handleOverImg(detailPet.imageTwo)} onMouseOut={handleOutImg} src={detailPet.imageTwo} />
                                    <img onMouseOver={() => handleOverImg(detailPet.imageThree)} onMouseOut={handleOutImg} src={detailPet.imageThree} />
                                    <img onMouseOver={() => handleOverImg(detailPet.imageFour)} onMouseOut={handleOutImg} src={detailPet.imageFour} />
                                </div>
                            </div>
                            <div className='right'>
                                <h2>{detailPet.name}</h2>
                                <div className='box'>
                                    <h3>ĐẶC QUYỀN ĐI KÈM</h3>
                                    <ul>
                                        <li>Trả góp LS 0% trong 12 tháng</li>
                                        <li>Bảo hành lên tới 365 ngày</li>
                                        <li>Bảo hiểm sức khỏe lên tới 1,000,000đ</li>
                                        <li>Miễn phí vận chuyển toàn quốc</li>
                                        <li>Giảm 500,000đ khi mua lần 2</li>
                                        <li>Giảm trọn đời 5% khi mua phụ kiện</li>

                                    </ul>
                                </div>
                                <p>
                                    {detailPet.detail}
                                </p>
                                <span className='total'>Price: ${detailPet.price}</span> <br />

                                <div >
                                    <a className="dedcription-btn" href="#">
                                        <span onClick={() => addToCard(detailPet)} className="name-descripeion">Thêm vào giỏ hàng</span>
                                        <div className="btn-icon">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='seeMore'>
                            <h3>See More</h3>
                            {detailPet.type == 'tivi' ? (
                                <div className='listSeeMore'>
                                    {typeDog.map((item, index) => {
                                        return (
                                            item.name != detailPet.name ? (
                                                <Link to={`/detail/pet/${item._id}`}>
                                                    <div className='item'>
                                                        <div className='name'>
                                                            <span> {item.name}</span> <br />
                                                            <i className="fa-regular fa-arrow-trend-down"></i>
                                                        </div>
                                                        <img src={item.imageOne} />
                                                    </div>
                                                </Link>

                                            ) : ('')
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className='listSeeMore'>
                                    {typeCat.map((item, index) => {
                                        return (
                                            item.name != detailPet.name ? (
                                                <Link to={`/detail/pet/${item._id}`}>
                                                    <div className='item'>
                                                        <div className='name'>
                                                            <span> {item.name}</span> <br />
                                                            <i className="fa-regular fa-arrow-trend-down"></i>
                                                        </div>
                                                        <img src={item.imageOne} />
                                                    </div>
                                                </Link>

                                            ) : ('')
                                        )
                                    })}
                                </div>
                            )}

                        </div>
                    </div>
                    <Footer />
                </div>
            ) : ('')}

        </>
    )
}

export default DetailPet