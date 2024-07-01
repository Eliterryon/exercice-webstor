import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function FeaturedProducts({products}){
    return (
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper bg-orange-900 h-96 max-w-screen-xl ">
                {products.map(product => ( 
                    <SwiperSlide className='bg'>
                        <div className='items-center'>{product.title}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
    );
}