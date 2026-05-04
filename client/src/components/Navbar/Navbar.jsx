import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Disclosure as="nav" className="bg-white py-3">
      {({ open }) => (
        <>
          <div className="container ">
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={`/`}>
                    <img
                      className="block h-10 w-auto"
                      src="/images/atlas-logo.svg"
                      alt="Atlas logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-2 lg:items-center">
                <NavLink
                  to={`/`}
                  className={({ isActive }) =>
                    isActive ? styles.activeNavLink : styles.navLink
                  }
                  onClick={() => {
                    // await navigate("/");
                    scroller.scrollTo("searchStickyContainer", {
                      duration: 500,
                      smooth: true,
                    });
                  }}
                >
                  Icons
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.activeNavLink : styles.navLink
                  }
                  to={`/packages`}
                >
                  Packages
                </NavLink>

                <a
                  href="http://vectoricons.net/"
                  target="_blank"
                  className={styles.navLink}
                >
                  <img
                    className="mr-2 h-6"
                    src="/images/vectoricons-logo.svg"
                    alt="Atlas logo"
                  />
                  VectorIcons Premium & Free Icons
                </a>
              </div>
              <div className="-mr-2 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                onClick={async () => {
                  await navigate("/");

                  scroller.scrollTo("searchStickyContainer", {
                    duration: 500,
                    smooth: true,
                  });
                }}
                className="block w-full text-left border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Icons
              </Disclosure.Button>
              <Disclosure.Button
                onClick={() => {
                  navigate("/packages");
                }}
                className="block w-full text-left border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Packages
              </Disclosure.Button>
              
              <Disclosure.Button
                as="a"
                href="http://vectoricons.net/"
                target="_blank"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <img
                  className="mr-2 inline-block w-7"
                  src="/images/vectoricons-logo.svg"
                  alt="VectorIcons logo"
                />
                VectorIcons Premium & Free Icons
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
