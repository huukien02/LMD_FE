import React from 'react'
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import ListProduct from '../ListProduct/ListProduct'

function Home() {
    return (
        <div>
            <Header />
            <Banner />
            <ListProduct />
            <Footer />
        </div>
    )
}

export default Home