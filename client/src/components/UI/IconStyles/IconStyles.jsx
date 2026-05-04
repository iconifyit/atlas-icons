import { useState } from "react";
import { Disclosure, Transition } from '@headlessui/react';
import fontWidth from "../../../shared/line-width.enum";
import Ripples from 'react-ripples';
import { ChromePicker } from 'react-color'
import styles from "./IconStyles.module.scss";
import { Menu } from '@headlessui/react'



const IconStyles = ({ categoriesOpen, setCategoriesOpen, ranges, iconColor, styleMenuOpen, handleSvgSize, colorChangedHandler, colorPickerHandler }) => {
    const handleColorPickerChange = (color, event) => {
        colorPickerHandler(color.hex)
    }

    return <>
        <Disclosure className="hidden lg:block">
            <Transition
                show={styleMenuOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Disclosure.Panel static>
                    <div className='flex justify-between items-center mt-4 lg:mt-0'>
                        <div className="flex flex-col sm:flex-row sm:space-x-8 lg:space-x-6 space-y-5 sm:space-y-0">
                            <div className={styles.rangeSlider}>
                                <label htmlFor="sizeRange">Size</label>
                                <input id="sizeRange"
                                    name="sizeRange"
                                    value={ranges.sizeRange}
                                    onInput={(e) => handleSvgSize(e)} type="range" min="12" max="100" />
                                <span>
                                    {ranges.sizeRange}px
                                </span>
                            </div>

                            <div className={styles.rangeSlider}>
                                <label htmlFor="strokeRange">Stroke</label>
                                <input id="strokeRange"
                                    name="strokeRange"
                                    value={ranges.strokeRange}
                                    onInput={(e) => handleSvgSize(e)} type="range" min="1" step="0.5" max="2" />
                                <span className='capitalize ml-3 !w-16'>
                                    {fontWidth[ranges.strokeRange]}
                                </span>
                            </div>

                            <div className={styles.rangeSlider}>
                                <label htmlFor="color">Color</label>

                                <div className={styles.colorInput}>
                                    <input
                                        id="color"
                                        name="color"
                                        type="text"
                                        value={iconColor}
                                        onChange={colorChangedHandler}
                                    />
                                    <Menu>
                                        <Ripples className="right-1 absolute rounded-full">
                                            <Menu.Button>
                                                {/*  */}
                                                <div className={styles.selectedColor} style={{ backgroundColor: CSS.supports('color', iconColor) ? iconColor : "#000" }} ></div>
                                                {/* menu */}
                                            </Menu.Button>
                                        </Ripples>
                                        <Menu.Items className='absolute top-12 sm:right-0 !z-50'>
                                            <ChromePicker onChange={handleColorPickerChange} color={iconColor} />
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <button onClick={setCategoriesOpen} className={styles.hideCategoriesBtn}>
                            {`${categoriesOpen ? 'Hide' : 'Show'}`} Categories
                        </button>
                    </div>
                </Disclosure.Panel>
            </Transition>
        </Disclosure>
    </>
}

export default IconStyles;