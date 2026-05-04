import React, { useState, useRef } from "react"
import IconDetails from '../IconDetails/IconDetails';
import styles from "./IconElement.module.scss";
import fileDownload from 'js-file-download';
import { ICONS_PATH } from '../../../shared/baseUrl';
import VisibilitySensor from 'react-visibility-sensor';
import Ripples from 'react-ripples';
import { toast } from "react-toastify";

const IconElement = ({ icon, iconColor, ranges, activeIcon, setActiveIcon }) => {
    const iconsPath = `${ICONS_PATH}icons/`;
    const [isVisible, setIsVisible] = useState(false)
    const closeDetails = () => {
        setActiveIcon(null)
    }

    const [iconSvg, setIconSvg] = useState("")

    const viewDetails = () => {
        setActiveIcon(icon._id)
    }

    const handleDownload = () => {
        fileDownload(iconSvg, icon.filename)
    }


    const copySvgCode = () => {
        const svgText = iconSvg;
        navigator.clipboard.writeText(svgText);
        toast.success("Svg code copied!")
    }

    const classOne = `cls-${icon._id}-1`;
    const classTwo = `cls-${icon._id}-2`;

    icon.svgCode = icon.svgCode.replaceAll("cls-1", classOne);
    icon.svgCode = icon.svgCode.replaceAll("cls-2", classTwo)

    const iconRef = (el) => {
        if (el && el.firstElementChild) {
            el.firstElementChild.setAttribute("stroke-width", ranges.strokeRange)
            el.firstElementChild.setAttribute("width", ranges.sizeRange)
            el.firstElementChild.setAttribute("height", ranges.sizeRange)
            el.firstElementChild.setAttribute("color", iconColor)
            setIconSvg(el.innerHTML)
        }
    }

    return (
        <>
            <figure>
                <div className={styles.relativeContainer}>
                    <VisibilitySensor
                        onChange={(isVisible) => {
                            setIsVisible(isVisible)
                        }}
                        offset={{ top: -300, bottom: -300 }} key={icon._id}>
                        {isVisible ?
                            <>
                                <div className={styles.imageContainer}>
                                    <div ref={iconRef} key={icon._id} dangerouslySetInnerHTML={{ __html: icon.svgCode }}></div>
                                </div>
                                <div className={styles.imageCtrls}>
                                    <div className={styles.ctrlsGrid}>
                                        <Ripples className="btn-ripple">
                                            <button onClick={handleDownload} >
                                                Download
                                            </button>
                                        </Ripples>
                                        <Ripples className="btn-ripple">
                                            <button onClick={copySvgCode}>
                                                Copy SVG
                                            </button>
                                        </Ripples>
                                        <Ripples className="btn-ripple">
                                            <button className="!bg-[#3F28FF] !hover:bg-[#1B00FC] text-white" onClick={viewDetails}>
                                                View
                                            </button>
                                        </Ripples>
                                    </div>
                                </div>
                            </> : <div className={styles.imageContainer}>

                            </div>
                        }
                    </VisibilitySensor>
                </div>
                <figcaption className={styles.figCaption}>{icon.name}</figcaption>
            </figure>
            {activeIcon === icon._id &&
                <div className={styles.iconDetailsCard}>
                    <IconDetails iconColor={iconColor} copySvgCode={copySvgCode} handleDownload={handleDownload} icon={icon} ranges={ranges} closeDetails={closeDetails} />
                </div>
            }
        </>

    )
}

export default IconElement;