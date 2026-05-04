import styles from './HomeHeader.module.scss';
import Skeleton from 'react-loading-skeleton';
import AnimatedNumber from 'react-animated-number';
import GetNotifiedInput from "../../UI/GetNotifiedInput/GetNotifiedInput";

const formatNum = (num = 0) => {
    return Math.ceil(num).toLocaleString()
}

const HomeHeader = ({ iconsCount, loaded }) => {
    return (
        <div className="container">
            <div className={styles.homeHeader}>
                <div className="w-full xl:w-10/12 2xl:w-8/12 mx-auto">
                    <p className='!font-semibold mb-3'>MIT License. Ready libraries</p>
                    <h2>
                        {!loaded && 
                        <span className="w-14 md:w-20 lg:w-28 xl:w-40 inline-block">
                            <Skeleton borderRadius={24} inline={true}  />
                        </span>
                        }
                        {loaded && 
                        <AnimatedNumber value={(iconsCount)}
                            duration={2000}
                            formatValue={n => formatNum(n)}
                        /> } 
                        {/* <span>{formatNum(iconsCount)}</span> */}
                        <span className='mx-3'>
                            Free Consistent
                        </span>
                        <span className={styles.underlineSpan}>Icons</span></h2>
                    <h1 className={styles.pageHeading}>
                    Open source free icons library, available in variable stroke SVG format, web font, Figma, React, Vue and Flutter ready to use packages
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;