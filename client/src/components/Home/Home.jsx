import { useState, useEffect, useRef } from "react";
import http from "../../services/httpService";
import HomeHeader from "../UI/HomeHeader/HomeHeader";
import Search from "../UI/Search/Search";
import { BASE_URL } from "../../shared/baseUrl";
import IconCategories from "../UI/IconCategories/IconCategories";
import AvailableFor from "../UI/AvailableFor/AvailableFor";
import MadeInVectorIcons from "../UI/MadeInVectorIcons/MadeInVectorIcons";
import { Link } from "react-scroll";
import styles from "./Home.module.scss";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [iconsCount, setIconsCount] = useState(0);
  const [loaded, setIsLoaded] = useState(false);

  const [ranges, setRanges] = useState({
    sizeRange: 24,
    strokeRange: 1.5,
  });
  const currentQuery = useRef("");

  const [iconColor, setIconColor] = useState("#000000");

  const [fabVisible, setFabVisible] = useState(false);

  const baseUrl = BASE_URL;

  const fetchCategories = () => {
    http
      .get(`${baseUrl}category/categories`)
      .then((res) => {
        if (res.status == 200) {
          // console.log(res.data.categories);
          setCategories(res.data.categories);
          setIconsCount(res.data.iconsCount);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
      });
  };

  const searchHandler = async (value) => {
    currentQuery.current = value;
    if (value) {
      let body = {
        q: value,
      };

      const result = await http.post(`${baseUrl}category/filter`, body);
      console.log(currentQuery.current == value);
      if (currentQuery.current == value) {
        setCategories(result.data);
      }
    } else {
      fetchCategories();
    }
  };

  const handleSvgChange = (input) => {
    ranges[input.name] = input.value;
    setRanges((ranges) => ({ ...ranges }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleFabVisibility = () => {
      window.scrollY > 400 ? setFabVisible(true) : setFabVisible(false);
    };
    window.addEventListener("scroll", handleFabVisibility);

    return () => {
      window.removeEventListener("scroll", handleFabVisibility);
    };
  }, []);

  return (
    <main id="home-main">
      <HomeHeader loaded={loaded} iconsCount={iconsCount} />
      <Search
        onSearch={(value) => {
          searchHandler(value);
        }}
        onColorChange={(value) => {
          setIconColor(value);
        }}
        categories={categories}
        ranges={ranges}
        loaded={loaded}
        iconColor={iconColor}
        onSvgChange={(event) => {
          handleSvgChange(event);
        }}
      />
      <div className="container">
        <IconCategories
          loaded={loaded}
          ranges={ranges}
          iconColor={iconColor}
          categories={categories}
        />
        <AvailableFor />
        <MadeInVectorIcons />
      </div>
      {/*  offset={-320} */}

      {fabVisible && (
        <Link
          to={"home-main"}
          spy={true}
          smooth={true}
          duration={500}
          className={styles.BackToTop}
        >
          <ChevronUpIcon className="block h-6 w-6" aria-hidden="true" />
        </Link>
      )}
    </main>
  );
};

export default Home;
