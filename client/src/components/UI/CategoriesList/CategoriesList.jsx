import { useState, useRef } from "react"
import { Disclosure, Transition } from '@headlessui/react';
import styles from "./CategoriesList.module.scss"
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Ripples from 'react-ripples'

const CategoriesList = ({ categories, categoriesOpen }) => {
    // const [swiper, setSwiper] = useState()
    const swiperRef = useRef();

    return (
        <Disclosure>
            <Transition
                show={categoriesOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Disclosure.Panel static>
                    {/* <div className="flex items-start"> */}
                    <div className="lg:mt-4 flex">
                        {categories.length  != 0 &&

                            <div className="inline-flex mr-2">
                                <Ripples className="rounded-full px-2">
                                    <button onClick={() => {
                                        swiperRef.current.slidePrev()
                                    }}><ChevronLeftIcon className="block h-6 w-6" aria-hidden="true" /></button>
                                </Ripples>
                            </div>
                        }

                        <Swiper
                            className="cursor-move grow"
                            slidesPerView={"auto"}
                            // ref={swiper}
                            spaceBetween={14}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            {categories.map((category) => {

                                return (category.icons.length != 0 &&
                                    <SwiperSlide  key={category._id}>
                                        <span>
                                            <Link to={"category-" + category._id} spy={true} smooth={true} offset={-360} duration={500} className={styles.categoryBtn}>
                                                {category.name}
                                            </Link>
                                        </span>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        {categories.length != 0 &&
                            <div className="inline-flex ml-2">
                                <Ripples  className="rounded-full px-2">
                                    <button onClick={() => {
                                        swiperRef.current.slideNext()
                                    }}><ChevronRightIcon className="block h-6 w-6" aria-hidden="true" /></button>
                                </Ripples>
                            </div>
                        }
                    </div>
                </Disclosure.Panel>
            </Transition>
        </Disclosure>
    )

}

export default CategoriesList;