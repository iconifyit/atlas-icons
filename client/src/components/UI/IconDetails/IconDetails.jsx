import styles from "./IconDetails.module.scss"
import fontWidth from "../../../shared/line-width.enum";
import { upperFirst } from "lodash";
import Ripples from 'react-ripples'
import { toast } from "react-toastify";

const CodeContainer = ({ name, code }) => {
    const clickHandler = () => {
        const text = code;
        navigator.clipboard.writeText(text);
        toast.success(`${name} snippet copied!`)
    }
    return (
        <div className="sm:col-span-2 lg:col-span-5">
            <p className="text-xs font-medium mb-2">{name}</p>
            <div className={styles.codeDiv}>
                <span>
                    {code}
                </span>
                <Ripples className="rounded-lg -my-2 -mr-2 ml-3">
                    <button className="p-2" onClick={clickHandler}>
                        <img src="/images/copy-icon.svg" />
                    </button>
                </Ripples>
            </div>
        </div>
    )
}

const IconDetails = ({ icon, ranges, iconColor, copySvgCode, closeDetails, handleDownload }) => {
    const iconRef = (el) => {
        if (el) {
            el.firstElementChild.setAttribute("stroke-width", ranges.strokeRange)
            el.firstElementChild.setAttribute("color", iconColor)
        }
    }

    return (
        <>
            <button className="absolute top-3 right-3 p-3" onClick={() => {
                closeDetails()
            }}>
                <img src="/images/close-icon.svg" alt="" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-x-12 gap-y-6">
                <div className={styles.iconSection}>
                    <div className="relative mt-7 mx-3 mb-7">
                        <div className={styles.iconContainer}>
                            <div className={styles.imgsAlign}>
                                <img src="/images/icon-grid.png" srcSet="./images/icon-grid_2x.png 2x" alt="" />
                                <div className="w-20 absolute" ref={iconRef} dangerouslySetInnerHTML={{ __html: icon.svgCode }}></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-[1.1rem] truncate mb-6 lg:mb-0">{icon.name}</p>
                </div>
                <CodeContainer
                name="React"
                    code={`<${icon.reactTaker} size={${ranges.sizeRange}} ${ranges.strokeRange != 1.5 ? 'weight="' + fontWidth[ranges.strokeRange] + '"' : ''}  />`}
                 />
                <CodeContainer name="HTML/CSS" 
                    code={`<i class="at-${icon.fontTaker}${ranges.strokeRange != 1.5 ? "-" + fontWidth[ranges.strokeRange] : ""}"></i>`} 
                />
                <CodeContainer name="Vue" 
                code={`<Atlas icon="${icon.reactTaker}" :size="${ranges.sizeRange}" ${ranges.strokeRange != 1.5 ? 'weight="' + fontWidth[ranges.strokeRange] + '"': ''} />`}
                 />
                <CodeContainer name="Flutter" code={`Icon( Atlas.${icon.flutterTaker}${ranges.strokeRange != 1.5? '_' + fontWidth[ranges.strokeRange]: ''}, size: ${ranges.sizeRange}.0, )`} />
                <div className="sm:col-span-2 lg:col-span-5 mt-3 lg:-mb-4 ">
                <Ripples className="rounded-lg w-full sm:w-auto sm:mr-4 mb-4 sm:mb-0">
                    <button className={styles.downloadBtn} onClick={handleDownload}>
                        Download
                    </button>
                    </Ripples>
                    <Ripples className="rounded-lg w-full sm:w-auto">
                    <button onClick={copySvgCode} className={styles.copySvgBtn}>
                        Copy SVG
                    </button>
                    </Ripples>
                </div>
            </div>
        </>
    )
}



export default IconDetails;