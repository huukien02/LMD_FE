import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Admin.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import jwt_decode from "jwt-decode";
import NotFound from '../NotFound/NotFound'

function Admin() {

    const token = localStorage.getItem("token");
    if (token != null) {
        var decoded = jwt_decode(token);
        var role = decoded.role
    }




    const [dataUser, setDataUser] = useState([])
    const [dataProduct, setDataProduct] = useState([])
    const [dataOder, setDataOder] = useState([])

    const [currentIdUser, setCurrentIdUser] = useState('')
    const [currentEmail, setCurrentEmail] = useState('')
    const [currentUsername, setCurrentUsername] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    const [modalUpdateUser, setModalUpdateUser] = useState(false)
    const [modalAddProduct, setModalAddProduct] = useState(false)

    const [modalDetailOrder, setModalDetailOrder] = useState(false)
    const [listDetailOrder, setListDetailOrder] = useState([])

    const [imgOne, setImgOne] = useState('')
    const [imgTwo, setImgTwo] = useState('')
    const [imgThree, setImgThree] = useState('')
    const [imgFour, setImgFour] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState('')
    const [typeProduct, setTypeProduct] = useState('')
    const [detailProduct, setDetailProduct] = useState('')

    const [change, setChange] = useState(true)

    useEffect(() => {

        axios
            .get(`http://localhost:4000/api/user`)
            .then(res => setDataUser(res.data));
    }, [change]);


    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/listpet`)
            .then(res => setDataProduct(res.data));
    }, [change]);


    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/mycart`)
            .then(res => setDataOder(res.data));
    }, [change]);


    // User
    const deleteUser = (id) => {
        let token = localStorage.getItem("token");

        if (window.confirm("Xóa user này không ??")) {
            axios.delete('http://localhost:4000/api/user/delete', {
                headers: {
                    Authorization: token
                },
                data: {
                    id
                }
            })

            setChange(prev => !prev)
        }

    }
    const updateUser = (item) => {

        const email = item.email
        const username = item.username
        const password = item.password
        const idUser = item._id

        setCurrentIdUser(idUser)
        setCurrentEmail(email)
        setCurrentUsername(username)
        setCurrentPassword(password)

        setModalUpdateUser(true)
    }

    const updateCurrentUser = () => {
        let data = { currentIdUser, currentEmail, currentUsername, currentPassword }
        axios.put('http://localhost:4000/api/user/update', {
            data
        })
            .then(function (res) {
                setChange(prev => !prev)
                setCurrentIdUser('')
                setCurrentEmail('')
                setCurrentUsername('')
                setCurrentPassword('')

                setModalUpdateUser(false)

            })
            .catch(function (error) {
                console.log(error)

            });
    }

    // Product
    const addProduct = () => {
        axios.post('http://localhost:4000/api/listpet/post', {
            imgOne, imgTwo, imgThree, imgFour, nameProduct, priceProduct, typeProduct, detailProduct
        })
            .then(function (res) {
                console.log(res)
                if (res.status == 200) {
                    setModalAddProduct(false)
                    setChange(prev => !prev)
                }


            })
            .catch(function (error) {
                console.log(error)

            });

    }

    const deleteProduct = (id) => {
        let token = localStorage.getItem("token");

        if (window.confirm("Xóa Product này không ??")) {
            axios.delete('http://localhost:4000/api/listpet/delete', {
                headers: {
                    Authorization: token
                },
                data: {
                    id
                }
            })

            setChange(prev => !prev)
        }
    }

    // Order
    const confirmOrder = (id) => {
        let token = localStorage.getItem("token");

        if (window.confirm("Xác nhận đơn hàng này")) {
            axios.delete('http://localhost:4000/api/mycart/delete', {
                headers: {
                    Authorization: token
                },
                data: {
                    id
                }
            })

            setChange(prev => !prev)
        }
    }
    const detailOrder = (item) => {
        let listProduct = item.listProduct;
        setListDetailOrder(listProduct)
        setModalDetailOrder(true)
    }



    return (
        <>
            {role == 'admin' ? (
                <div>
                    <div> <Header /></div>
                    <div className='admin'>
                        <h1>THỐNG KÊ:</h1>
                        {dataUser.length > 0 ? (
                            <p><strong>User: </strong> {dataUser.length}</p>
                        ) : ('')}

                        {dataProduct.length > 0 ? (
                            <p><strong>Product: </strong> {dataProduct.length}</p>
                        ) : ('')}


                        {dataOder.length > 0 ? (
                            <p><strong>Order: </strong> {dataOder.length}</p>
                        ) : ('')}

                        <hr />



                        {/* User */}
                        <div className='user'>
                            <h3 style={{ color: 'red' }}>USER</h3>

                            {modalUpdateUser ? (
                                <div className='form'>
                                    <div className='modal'>
                                        <button onClick={() => { setModalUpdateUser(false) }} className='btnClose'>X</button>
                                        <h3>Update User</h3>
                                        <div className='item'>
                                            <p>Email:</p>
                                            <input
                                                value={currentEmail}
                                                onChange={e => setCurrentEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Username:</p>
                                            <input
                                                value={currentUsername}
                                                onChange={e => setCurrentUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Password:</p>
                                            <input
                                                value={currentPassword}
                                                onChange={e => setCurrentPassword(e.target.value)}
                                            />
                                        </div>

                                        <button className='btnAdd' onClick={updateCurrentUser}>Update</button>
                                    </div>
                                </div>
                            ) : ('')}

                            {dataUser.length > 0 ? (
                                <div className='table'>
                                    <table border={1}>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>EMAIL</th>
                                                <th>USERNAME</th>
                                                <th>PASSWORD</th>
                                                <th>ROLE</th>
                                                <th>OTHER</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataUser.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.password}</td>
                                                        <td>{item.role}</td>
                                                        <td>
                                                            <i onClick={() => { deleteUser(item._id) }} className="fa-solid fa-trash-can"></i>
                                                            <i onClick={() => { updateUser(item) }} className="fa-solid fa-pen-to-square"></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                        </div>
                        <hr />


                        {/* Product */}
                        <div className='product'>
                            <h3 style={{ color: 'red' }}>PRODUCT</h3>
                            <button onClick={() => { setModalAddProduct(true) }}>ADD PRODUCT</button>

                            {modalAddProduct ? (
                                <div className='form'>
                                    <div className='modal'>
                                        <button onClick={() => { setModalAddProduct(false) }} className='btnClose'>X</button>
                                        <div className='item'>
                                            <p>Image 1:</p>
                                            <input
                                                onChange={e => { setImgOne(e.target.value) }}
                                                placeholder='Link image 1'
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Image 2:</p>
                                            <input
                                                onChange={e => { setImgTwo(e.target.value) }}
                                                placeholder='Link image 2'
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Image 3:</p>
                                            <input
                                                onChange={e => { setImgThree(e.target.value) }}
                                                placeholder='Link image 3'
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Image 4:</p>
                                            <input
                                                onChange={e => { setImgFour(e.target.value) }}
                                                placeholder='Link image 4'
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Name:</p>
                                            <input
                                                onChange={e => { setNameProduct(e.target.value) }}
                                                placeholder='Enter name'
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Price:</p>
                                            <input
                                                onChange={e => { setPriceProduct(e.target.value) }}
                                                placeholder='Enter Price'
                                            />
                                        </div>
                                        <div className='item'>
                                            <p>Type:</p>
                                            <select onChange={e => { setTypeProduct(e.target.value) }} >
                                                <option value={''}>Chọn</option>
                                                <option value={`tivi`}>Tivi</option>
                                                <option value={`fridge`}>Tủ Lạnh</option>

                                            </select>
                                        </div>
                                        <div className='item'>
                                            <p>detail:</p>
                                            <input
                                                onChange={e => { setDetailProduct(e.target.value) }}
                                                placeholder='Enter detail'
                                            />
                                        </div>
                                        <button className='btnAdd' onClick={addProduct}>ADD PRODUCT</button>
                                    </div>
                                </div>
                            ) : ('')}


                            {dataProduct.length > 0 ? (
                                <div className='table'>
                                    <table border={1}>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>NAME</th>
                                                <th>IMAGE</th>
                                                <th>PRICE</th>
                                                <th>TYPE</th>
                                                <th>OTHER</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataProduct.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <img src={item.imageOne} />
                                                        </td>
                                                        <td>{item.price}</td>
                                                        <td>{item.type}</td>
                                                        <td>
                                                            <i onClick={() => deleteProduct(item._id)} className="fa-solid fa-trash-can"></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                        </div>
                        <hr />


                        {/* Order */}
                        <div className='order'>
                            <h3 style={{ color: 'red' }}>Order</h3>
                            {dataOder.length > 0 ? (
                                <div className='table'>
                                    <table border={1}>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>NAME</th>
                                                <th>ADDRESS</th>
                                                <th>PHONE</th>
                                                <th>TOTAL</th>
                                                <th>NOTE</th>
                                                <th>OTHER</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataOder.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.phone}</td>
                                                        <td>${item.total}</td>
                                                        <td>{item.note}</td>
                                                        <td>
                                                            <i onClick={() => detailOrder(item)} className="fa-solid fa-eye"></i>
                                                            <i onClick={() => { confirmOrder(item._id) }} className="fa-solid fa-circle-check"></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}


                            {modalDetailOrder ? (
                                <>
                                    {listDetailOrder.length > 0 ? (
                                        <div className='table'>
                                            <button className='btnClose' onClick={() => { setModalDetailOrder(false) }}>X</button>
                                            <table border={1}>
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>IMAGE</th>
                                                        <th>NAME</th>
                                                        <th>PRICE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listDetailOrder.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <img src={item.imageOne} />
                                                                </td>
                                                                <td>{item.name}</td>
                                                                <td>{item.price}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : ('')}
                                </>
                            ) : ('')}
                        </div>
                        <hr />

                    </div>
                    <div><Footer /></div>
                </div>
            ) : (
                <div><NotFound /></div>
            )}
        </>
    )
}

export default Admin