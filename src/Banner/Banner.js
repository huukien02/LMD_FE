import React, { useState } from 'react'
import './Banner.scss'

function Banner() {


    return (
        <>
            <div className='Banner'>
                <div className='imgLeft'>
                    <img src='https://img4.thuthuatphanmem.vn/uploads/2020/06/26/banner-dien-may-khuyen-mai-tet_033704418.png' />
                </div>
                <div className='imgRight'>
                    <img src='https://img4.thuthuatphanmem.vn/uploads/2020/06/26/hinh-anh-banner-dien-may-tang-kem_033705356.png' />
                    <img src='https://img4.thuthuatphanmem.vn/uploads/2020/06/26/mau-banner-quang-cao-dien-may-dep_033706981.jpg' />
                </div>
            </div>

        </>

    )
}

export default Banner