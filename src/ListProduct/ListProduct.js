import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListProduct.scss'

function ListProduct() {
    const [dataDog, setDataDog] = useState([])
    const [dataCat, setDataCat] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/listpet/type/tivi")
            .then(res => setDataDog(res.data));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/listpet/type/fridge")
            .then(res => setDataCat(res.data));
    }, []);

    return (
        <div className='container'>
            <div className='listPet'>
                <div className='left'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC0KPLfs79dB9TvYJ5HDTidaJAXMAfIMSNNv7aJuX_oGtL9z0_FaC6KizZsD2fZWtSRgw&usqp=CAU' />
                </div>

                <div className='right'>
                    <div className='list'>
                        {dataDog.length > 0 ? (
                            dataDog.map((item, index) => {
                                return (
                                    <div className='item'>
                                        <div className='icon'>
                                            <Link to={`/detail/pet/${item._id}`}>
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </Link>

                                            <i className="fa-solid fa-heart"></i>
                                        </div>
                                        <img src={item.imageOne} />
                                        <br /> <br />
                                        <p>{item.name}</p>
                                        {/* <button>Mua Hàng &rsaquo;&rsaquo;</button> */}
                                    </div>
                                )
                            })
                        ) : ('')}
                    </div>
                </div>

            </div>

            <br></br><br></br>

            <div className='listPet'>
                <div className='left'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwNkET5Zy2ht2hUiKbi73HTHG4_EqYXJGnVNVwYw_3ysoG56CcVKSWZEQdM44S8jDvSfc&usqp=CAU' />
                </div>


                <div className='right'>
                    <div className='list'>
                        {dataCat.length > 0 ? (
                            dataCat.map((item, index) => {
                                return (
                                    <div className='item'>
                                        <div className='icon'>
                                            <Link to={`/detail/pet/${item._id}`}>
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </Link>
                                            <i className="fa-solid fa-heart"></i>
                                        </div>
                                        <img src={item.imageOne} />
                                        <br /> <br />
                                        <p>{item.name}</p>
                                        {/* <button>Mua Hàng &rsaquo;&rsaquo;</button> */}
                                    </div>
                                )
                            })
                        ) : ('')}
                    </div>
                </div>

            </div>

            <br></br>

            <div className='dacQuyen'>
                <h1>ĐẶC QUYỀN CHỈ CÓ TẠI AZPET</h1>
                <i className="fa-solid fa-paw fa-2x"></i> <br /><br />
                <div className='list'>
                    <div className='item'>
                        <img src='https://azpet.com.vn/wp-content/uploads/2021/07/mua-thu-cung-tra-gop-12-thang.gif' />
                        <p>Trả góp lãi suất 0% trong 12 tháng</p>
                    </div>
                    <div className='item'>
                        <img src='https://azpet.com.vn/wp-content/uploads/2021/07/bao-hanh-365-ngay.gif' />
                        <p>Bảo hành toàn diện 365 ngày</p>
                    </div>
                    <div className='item'>
                        <img src='https://azpet.com.vn/wp-content/uploads/2021/07/ho-tro-chi-phi-kham-chua-benh.gif' />
                        <p>Bảo hiểm sức khỏe lên tới 1,000,000đ</p>
                    </div>
                    <div className='item'>
                        <img src='https://azpet.com.vn/wp-content/uploads/2021/07/mien-phi-van-chuyen.gif' />
                        <p>Miễn phí vận chuyển toàn quốc</p>
                    </div>
                </div>
            </div>
            <br /><br />

            {/* <div className='review'>
                <h1>KHÁCH HÀNG ĐÁNH GIÁ</h1> <br /><br />
                <div className='rate'>
                    <div className='left'>
                        <h2>4/5</h2>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <h2>4 ratings</h2>
                    </div>
                    <div className='right'>
                        <p>
                            5 stars
                            <span className='line'></span>
                        </p>
                        <p>
                            4 stars
                            <span className='line'></span>
                        </p>
                        <p>
                            3 stars
                            <span className='line'></span>
                        </p>
                        <p>
                            2 stars
                            <span className='line'></span>
                        </p>
                        <p>
                            1 stars
                            <span className='line'></span>
                        </p>
                    </div>
                </div>
                <br /><br />
                <div className='listReview'>
                    <div className='item'>
                        <div className='header'>
                            <img src='https://scontent.fhan15-1.fna.fbcdn.net/v/t1.6435-1/188656727_818885385699810_8263469887090114968_n.jpg?stp=dst-jpg_p240x240&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Lt10A8P5_k8AX8PpvaJ&tn=h-rcQ-OhzYnjnZ0r&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDoPt0Fwuuic2hObe2D3veJwCEbz35P41BsQwKY5w5xCg&oe=63D8A197' />
                            <p>huukien01</p>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <span>December 2, 2022 at 7:59 pm</span>
                        </div>
                        <div className='body'>
                            <p>Hello world</p>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='header'>
                            <img src='https://scontent.fhan15-1.fna.fbcdn.net/v/t1.6435-1/188656727_818885385699810_8263469887090114968_n.jpg?stp=dst-jpg_p240x240&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Lt10A8P5_k8AX8PpvaJ&tn=h-rcQ-OhzYnjnZ0r&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDoPt0Fwuuic2hObe2D3veJwCEbz35P41BsQwKY5w5xCg&oe=63D8A197' />
                            <p>huukien01</p>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <span>December 2, 2022 at 7:59 pm</span>
                        </div>
                        <div className='body'>
                            <p>Hello world</p>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='header'>
                            <img src='https://scontent.fhan15-1.fna.fbcdn.net/v/t1.6435-1/188656727_818885385699810_8263469887090114968_n.jpg?stp=dst-jpg_p240x240&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Lt10A8P5_k8AX8PpvaJ&tn=h-rcQ-OhzYnjnZ0r&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDoPt0Fwuuic2hObe2D3veJwCEbz35P41BsQwKY5w5xCg&oe=63D8A197' />
                            <p>huukien01</p>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <span>December 2, 2022 at 7:59 pm</span>
                        </div>
                        <div className='body'>
                            <p>Hello world</p>
                        </div>
                    </div>
                </div>


                <br /><br />
                <div className='pageReview'>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                </div>
                <br /><br />

                <div className='vote'>
                    <h2>Leave a Review</h2>
                    <textarea />
                    <p>
                        Vote:   <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </p>
                    <button>
                        <span>Review </span>
                    </button>
                </div>
            </div> */}

            <br></br><br />
        </div>
    )
}

export default ListProduct