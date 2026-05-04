import styles from "./Packages.module.scss";
import MadeInVectorIcons from "../UI/MadeInVectorIcons/MadeInVectorIcons"


const Packages = () => {
    return (
        <div className="container">
            <div className="max-w-6xl px-3 mx-auto mt-24 mb-24">
                {/* // <link ></link> */}

                <img
                    className="block mx-auto h-20 w-auto mb-6"
                    src="/images/atlas-logo-icon.svg"
                    alt="Atlas logo"
                />
                <h2 className="text-lg sm:text-2xl  text-gray-500 mb-24 text-center">
                    {/* Atlas icons is an open source icons library, */}
                    Here's the easiest way to use Atlas icons into your HTML/CSS, React, Vue or Flutter project.

                </h2>
                <h3 className={styles.packHeading}>Simple use</h3>
                <p className={styles.packP}>
                    Use icons as a webfont. All you need to do is add the style file to the document <code className="bg-[#F7F7F7]">{'<head>'}</code> tag.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'<link rel="stylesheet" href="https://unpkg.com/@vectoricons/atlas-icons/style.css">'}
                    </code>
                </div>
                <p className={styles.packP}>
                    Or use NPM to install font package.
                </p>
                <div className={styles.codeSnippet}>
                    <code className="text-gray-500">
                    // Install package.
                    </code>

                    <code className="mb-3">
                        npm i @vectoricons/atlas-icons
                    </code>

                    <code className="text-gray-500">
                    // Includes package styles in you main styles file.
                    </code>

                    <code className="mb-3">
                        @import url("/node_modules/@vectoricons/atlas-icons/style.css");
                    </code>

                    <code className="text-gray-500">
                    // Or add the style to the document {'<head>'} tag.
                    </code>
                    <code>
                        {'<link rel="stylesheet" href="node_modules/@vectoricons/atlas-icons/style.css">'}
                    </code>

                </div>
                <p className={styles.packP}>
                    Start adding icons to you HTML files.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'<i class="at-audio-album"></i>'}
                    </code>
                </div>
                <h3 className={styles.packHeading}>React</h3>
                <p className={styles.packP}>
                    Install React package.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'npm i @vectoricons/atlas-icons-react'}
                    </code>
                </div>


                <p className={styles.packP}>
                    Import icons into your React commpoent.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'import { AudioAlbum } from "@vectoricons/atlas-icons-react";'}
                    </code>
                </div>

                <p className={styles.packP}>
                    Embed icon selector into component template.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'<AudioAlbum size={24}   />'}
                    </code>
                </div>

                <h3 className={styles.packHeading}>React Native</h3>
                <p className={styles.packP}>
                Install <code> react-native-svg</code> to be able to use SVGs in your app.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'npx expo install react-native-svg'}
                    </code>
                </div>
                <p className={styles.packP}>
                    Install React Native package.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'npm i @vectoricons/atlas-icons-react-native'}
                    </code>
                </div>


                <p className={styles.packP}>
                    Import icons into your React commpoent.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'import { AudioAlbum } from "@vectoricons/atlas-icons-react-native";'}
                    </code>
                </div>

                <p className={styles.packP}>
                    Embed icon selector into component template.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'<AudioAlbum size={24} color="#000" /> '}
                    </code>
                </div>

                <h3 className={styles.packHeading}>Vue</h3>
                <p className={styles.packP}>
                    Install Vue package.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'npm i @vectoricons/atlas-icons-vue'}
                    </code>
                </div>


                <p className={styles.packP}>
                    Use Atlas Icons package in your <code className="bg-[#F7F7F7]">main.js</code>
                </p>
                <div className={styles.codeSnippet}>
                    <code className="text-gray-500">
                        {'import {createApp} from \'vue\''}
                    </code>
                    <code className="text-gray-500 mb-3">
                        {'import App from \'./App.vue\''}
                    </code>
                    <code className="mb-3">
                        {"import Atlas from '@vectoricons/atlas-icons-vue'"}
                    </code>
                    <code className="text-gray-500 mb-3">
                        {"const app = createApp(App)"}
                    </code>
                    <code className="mb-3">
                        {"app.use(Atlas);"}
                    </code>
                    <code className="text-gray-500">
                        {"app.mount('#app')"}
                    </code>
                </div>
                <p className={styles.packP}>
                    Embed icon selector into component template.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'<Atlas icon="AudioAlbum" :size="24" />'}
                    </code>
                </div>
                <h3 className={styles.packHeading}>Flutter</h3>
                <p className={styles.packP}>
                    Install Flutter package.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'flutter pub add atlas_icons'}
                    </code>
                </div>

                <p className={styles.packP}>
                    Import package in your Dart file.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'import \'package:atlas_icons/atlas_icons.dart\';'}
                    </code>
                </div>
                <p className={styles.packP}>
                    Embed <code className="bg-[#F7F7F7]">Icon</code> widget into your component.
                </p>
                <div className={styles.codeSnippet}>
                    <code>
                        {'Icon( Atlas.audio_album, size: 24.0, )'}
                    </code>
                </div>
            </div>

            <MadeInVectorIcons />
        </div>


    )
}

export default Packages;