import { useEffect, useState } from "react";
import { BASE_URL } from "../../../shared/baseUrl";
import IconStyles from "../IconStyles/IconStyles";
import CategoriesList from "../CategoriesList/CategoriesList";
import GetNotifiedModal from "../GetNotifiedModal/GetNotifiedModal";
import Ripples from "react-ripples";
import Skeleton from "react-loading-skeleton";

const Search = ({
  categories,
  onSearch,
  onSvgChange,
  iconColor,
  onColorChange,
  ranges,
  loaded,
}) => {
  const baseUrl = BASE_URL;
  const [styleMenuOpen, setStyleMenuOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [modalIsOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const el = document.querySelector(".searchStickyContainer");
    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle("isPinned", e.boundingClientRect.top < 0);
      },
      { threshold: [1] }
    );
    observer.observe(el);
    return () => {};
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    onSearch(input.value);
  };

  const handleSvgSize = ({ currentTarget: input }) => {
    onSvgChange(input);
  };

  const colorChangedHandler = ({ currentTarget: input }) => {
    onColorChange(input.value);
  };

  const colorPickerHandler = (value) => {
    onColorChange(value);
  };

  const CategoriesSkeleton = () => {
    return (
      <div className="lg:mt-4 flex gap-4">
        <span className="w-32">
          <Skeleton borderRadius={20} height={40} />
        </span>
        <span className="w-16">
          <Skeleton borderRadius={20} height={40} />
        </span>
        <span className="w-24">
          <Skeleton borderRadius={20} height={40} />
        </span>
        <span className="w-36">
          <Skeleton borderRadius={20} height={40} />
        </span>
        <span className="w-24">
          <Skeleton borderRadius={20} height={40} />
        </span>
        <span className="w-20">
          <Skeleton borderRadius={20} height={40} />
        </span>
        <span className="w-36">
          <Skeleton borderRadius={20} height={40} />
        </span>
      </div>
    );
  };

  return (
    <div id="searchStickyContainer" className="searchStickyContainer">
      <div className="container">
        <div className="flex items-start">
          <img
            className="search-logo mt-[1.15rem]"
            src="/images/search-logo.svg"
            alt="Search logo"
          />
          <div className="grow">
            <div className="flex lg:block items-center relative">
              <div className="rounded-xl grow shadow-lg lg:mb-6">
                <img
                  className="h-5 w-5 lg:h-7 lg:w-7 absolute lg:top-7 lg:left-9 top-[1.15rem] left-5"
                  src="/images/search-icon.svg"
                  alt="Search icon"
                />
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-xl border-transparent lg:text-lg lg:pl-20 pl-14  lg:py-7 py-4"
                  placeholder="Search"
                />
              </div>
              <div className="flex justify-end lg:mb-6 lg:absolute right-5 top-4 items-center lg:pr-3">
                <Ripples className="mr-5 rounded-full">
                  <button
                    onClick={() => {
                      setStyleMenuOpen(!styleMenuOpen);
                      // setCategoriesOpen(!categoriesOpen)
                    }}
                    type="button"
                    className={`${
                      styleMenuOpen ? "bg-[#A1DD1D]" : "bg-[#EDEDED]"
                    } hidden lg:inline-flex items-center justify-center w-12 h-12 rounded-full text-sm font-medium`}
                  >
                    <img
                      className="w-6"
                      src="/images/sliders-icon.svg"
                      alt="Sliders icon"
                    />
                  </button>
                </Ripples>
                <Ripples className="rounded-md">
                  <a
                    href="https://www.figma.com/community/plugin/1182746451598399442/Atlas-Icons"
                    target="_blank"
                    className="hidden lg:inline-flex items-center px-5 text-sm font-medium hover:bg-gray-100 py-2"
                  >
                    <img
                      className="xl:mr-3"
                      src="/images/Figma-logo.svg"
                      alt="Figma logo"
                    />
                    <span className="hidden xl:inline">Figma library</span>
                  </a>
                </Ripples>
                <Ripples className="rounded-md">
                  <button
                    className="hidden lg:inline-flex items-center px-5 text-sm font-medium hover:bg-gray-100 py-4"
                    type="button"
                    onClick={() => setModalOpen(true)}
                  >
                    <img
                      className="xl:mr-3"
                      src="/images/download-cloud.svg"
                      alt="Download cloud"
                    />
                    <span className="hidden xl:inline">Download all</span>
                  </button>
                </Ripples>
                <Ripples className="rounded-md">
                  <a
                    href="https://github.com/Vectopus/Atlas-icons-font"
                    target="_blank"
                    className="hidden sm:inline-flex items-center px-5 text-sm font-medium py-2 hover:bg-gray-100"
                  >
                    <img
                      className="xl:mr-3"
                      src="/images/github-logo.svg"
                      alt="Github logo"
                    />
                    <span className="hidden xl:inline">Github</span>
                  </a>
                </Ripples>
                <Ripples className="rounded-md">
                  <a
                    href="https://vectoricons.net/"
                    target="_blank"
                    className="inline-flex items-center px-2 sm:px-5 text-sm font-medium py-2 hover:bg-gray-100"
                  >
                    <img
                      className="xl:mr-3 w-7"
                      src="/images/vectoricons-logo.svg"
                      alt="VectorIcons logo"
                    />
                    <span className="hidden xl:inline">VectorIcons</span>
                  </a>
                </Ripples>
              </div>
            </div>
            <IconStyles
              categoriesOpen={categoriesOpen}
              setCategoriesOpen={() => {
                setCategoriesOpen(!categoriesOpen);
              }}
              ranges={ranges}
              styleMenuOpen={styleMenuOpen}
              iconColor={iconColor}
              handleSvgSize={handleSvgSize}
              colorChangedHandler={colorChangedHandler}
              colorPickerHandler={colorPickerHandler}
            />
          </div>
        </div>
        <div className="hidden lg:block">
          {!loaded && <CategoriesSkeleton />}
          <CategoriesList
            categoriesOpen={categoriesOpen}
            categories={categories}
          />
        </div>
      </div>
      <GetNotifiedModal modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default Search;
