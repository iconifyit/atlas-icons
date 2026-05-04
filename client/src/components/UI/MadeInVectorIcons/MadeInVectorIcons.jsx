import styles from "./MadeInVectorIcons.module.scss";
import GetNotifiedInput from "../GetNotifiedInput/GetNotifiedInput";


const MadeInVectorIcons = () => {
  return (
    <div className={styles.madeInVectorIcons}>
      <a
        className={styles.vectorIconsLink}
        href="http://vectoricons.net/"
        target="_blank"
      >
        <img
          className={styles.vectorIconsLogo}
          src="/images/vectoricons-logo.svg"
          alt="VectorIcons logo"
        />
        <h3>
          Made in <span className="font-bold">VectorIcons</span>
        </h3>
      </a>
      <div className={styles.teamMembersContainer}>
        <img
          className="!ml-0"
          src="/images/team-member-1.png"
          srcSet="./images/team-member-1_2x.png 2x"
          alt="Team member 1"
        />

        <img
          src="/images/team-member-2.png"
          srcSet="./images/team-member-2_2x.png 2x"
          alt="Team member 2"
        />

        <img
          src="/images/team-member-3.png"
          srcSet="./images/team-member-3_2x.png 2x"
          alt="Team member 3"
        />

        <img
          src="/images/team-member-4.png"
          srcSet="./images/team-member-4_2x.png 2x"
          alt="Team member 4"
        />

        <img
          src="/images/team-member-5.png"
          srcSet="./images/team-member-5_2x.png 2x"
          alt="Team member 5"
        />

        <img
          src="/images/team-member-6.png"
          srcSet="./images/team-member-6_2x.png 2x"
          alt="Team member 6"
        />

        <img
          src="/images/team-member-7.png"
          srcSet="./images/team-member-7_2x.png 2x"
          alt="Team member 7"
        />

        <img
          src="/images/team-member-8.png"
          srcSet="./images/team-member-8_2x.png 2x"
          alt="Team member 8"
        />

        <img
          src="/images/team-member-9.png"
          srcSet="./images/team-member-9_2x.png 2x"
          alt="Team member 9"
        />
      </div>
      <p className="leading-normal">
        We created a library of free icons for daily use, made to be your
        multi-purpose companion for amazing designs. Thousands of icons
        consistent in style and detail level, easy to edit with 3 different
        stroke weights and flexible size. Recolor the icons and download them or
        get the Figma plugin to drop the icons right into your designs.
      </p>
      <div className="max-w-xl mx-auto mb-8">
        <GetNotifiedInput />
      </div>
      <p className="leading-normal">
        Atlas icons is free and open-source,{" "}
        <span className="underline font-medium">licensed under MIT</span>. If
        you enjoy using these icons, spread the name and help others benefit
        too, support the project by making it a global phenomenon.
      </p>
      <a
        href="https://github.com/Vectopus/Atlas-icons-font/issues"
        target="_blank"
      >
        💡 Suggest new icons
      </a>
      <a
        href="https://www.getillustrations.com/custom-illustrations"
        target="_blank"
      >
        {" "}
        🎨 Request custom icons
      </a>
      <a href="https://www.getillustrations.com/" target="_blank">
        {" "}
        🖼️ Illustrations bundle
      </a>
      <a href="https://doodlicons.com/" target="_blank">
        {" "}
        ✒️ Get Doodles and Scribbles
      </a>

      <a
        href="https://github.com/Vectopus/Atlas-icons-font/blob/main/LICENSE"
        target="_blank"
        // className={styles.navLink}
      >
        MIT License
      </a>
      <a
        href="https://github.com/Vectopus/Atlas-icons-font"
        target="_blank"
      >
        Github
      </a>

      <a
        className="font-medium !my-36"
        target="_blank"
        href="https://twitter.com/intent/tweet?text=Check out Atlas Icons 2,000+ Free MIT icons🔥Available for @figma users and ready made vue react flutter libraries by the creators of @Roundicons and @VectopusHQ &url=https://atlasicons.vectopus.com/ "
      >
        <img
          className="inline-block mr-2"
          src="/images/twitter-icon.svg"
          alt=""
        />
        Share on twitter
      </a>
    </div>
  );
};

export default MadeInVectorIcons;
