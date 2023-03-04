import React, { useEffect, useState } from 'react'
import './Cart.scss'
import axios from 'axios'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'

function Cart() {
    const [data, setData] = useState([])
    const [change, setChange] = useState(true)
    const [form, setForm] = useState(false)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')


    //check login
    let checkLogin = localStorage.getItem("token");

    useEffect((() => {
        let valueLocal = localStorage.getItem("cart");
        let data = JSON.parse(valueLocal)
        setData(data)
    }), [change])


    const handleDelete = (index) => {

        if (window.confirm("Delete the item?")) {
            data.splice(index, 1);
            let toString = JSON.stringify(data);
            localStorage.setItem("cart", toString);
            setChange(prev => !prev)
        }

    }

    //total
    let total = 0;
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            total += Number(data[i].price)
        }
    }

    const handleOrder = () => {

        let data = JSON.parse(localStorage.getItem("cart"))
        let listProduct = []
        for (let i = 0; i < data.length; i++) {
            listProduct.push(data[i]._id)

        }


        axios.post('http://localhost:4000/api/mycart/post', {
            name, phone, address, note, total, listProduct
        })
            .then(function (res) {
                let empty = [];
                localStorage.setItem("cart", JSON.stringify(empty));
                setForm(false)
                setChange(prev => !prev)

            })
            .catch(function (error) {
                console.log(error)

            });



    }


    return (
        <>
            {checkLogin != null ? (
                <>
                    <div> <Header /></div>
                    <div className='Cart'>

                        {data.length > 0 ? (
                            <div className='table'>
                                <table border={1}>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Name</th>
                                            <th>IMG</th>
                                            <th>Price</th>
                                            <th>Other</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <img src={item.imageOne} />
                                                    </td>
                                                    <td>{item.price}</td>
                                                    <td>
                                                        <i onClick={() => handleDelete(index)} className="fa-solid fa-trash-can"></i>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <h2>Total: ${total}</h2>
                                <button onClick={() => { setForm(true) }}>Order Now</button>
                            </div>
                        ) : ('')}



                        {form ? (
                            <div className='form'>
                                <div className='modal'>
                                    <button className='btnClose' onClick={() => { setForm(false) }}>X</button>
                                    <div className='item'>
                                        <p>Name:</p>
                                        <input
                                            placeholder='Enter name'
                                            onChange={e => { setName(e.target.value) }}
                                        />
                                    </div>
                                    <div className='item'>
                                        <p>Phone:</p>
                                        <input
                                            onChange={e => { setPhone(e.target.value) }}
                                            placeholder='Enter phone'
                                        />
                                    </div>
                                    <div className='item'>
                                        <p>Address:</p>
                                        <input
                                            onChange={e => { setAddress(e.target.value) }}
                                            placeholder='Enter adrress'
                                        />
                                    </div>
                                    <div className='item'>
                                        <p>Note:</p>
                                        <textarea
                                            onChange={e => setNote(e.target.value)}
                                            placeholder='Enter note'
                                        />
                                    </div>
                                    <button onClick={handleOrder} className='btnAdd'>Order</button>
                                </div>
                            </div>
                        ) : ('')}



                    </div>
                    <div><Footer /></div>
                </>
            ) : (<NotFound />)}
        </>
    )
}

export default Cart