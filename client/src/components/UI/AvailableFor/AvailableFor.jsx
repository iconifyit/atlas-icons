import styles from "./AvailableFor.module.scss"
const AvailableFor = () => {
    return (
        <div className={styles.cardContainer}>
            <h2>

                Available for
            </h2>
            <p className="!leading-normal">
            Made for designers and web developers
Atlas icons offers free ready to import and use libraries for front end development and web design, connect to our Github to start using the icons instantly with easy integration into your system.
            </p>
            <div className="flex flex-wrap xl:flex-nowrap grayscale mb-8 items-center justify-center">
                <div className="mx-5">
                    <img
                        className="h-14"
                        src="/images/flutter-logo.svg"
                        alt="Flutter logo"
                    />
                </div>
                
                <div className="mx-5 my-3 xl:my-0">
                    <img
                        className="h-16"
                        src="/images/vue-js.svg"
                        alt="Vue logo"
                    />
                </div>
                <div className="mx-5 my-3 xl:my-0">
                    <img
                        className="h-24"
                        src="/images/reactjs-logo.svg"
                        alt="React logo"
                    />
                </div>

                <div className="mx-5 my-3 xl:my-0">
                    <img
                     className="h-16"
                        src="/images/Figma-logo.svg"
                        alt="Figma logo"
                        />
                </div>
            </div>
            <a href="https://github.com/Vectopus/Atlas-icons-font" target="_blank">
                Connect to Github
            </a>
        </div>
    )

}


export default AvailableFor;