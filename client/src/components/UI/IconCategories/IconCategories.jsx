import React, { useState } from "react";
import IconElement from "../IconElement/IconElement";
import IconAccordion from "../IconAccordion/IconAccordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import styles from "./IconCategories.module.scss";
import Skeleton from "react-loading-skeleton";

const IconCategories = ({ categories, ranges, iconColor, loaded }) => {
  const [activeIcon, setActiveIcon] = useState(null);

  const IconSkeleton = () => {
    return (
      <div className="pt-[100%] relative">
        <Skeleton
          borderRadius={"0.5rem"}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          inline={true}
        />
      </div>
    );
  };
  const PackLoader = () => {
    const items = [...Array(16)];
    return (
      <>
        <div className="flex w-full items-end px-0 lg:px-6">
          <span className="mr-4 w-40 lg:mr-6">
            <Skeleton borderRadius={6} height={28} inline={true} />
          </span>
          <span className="w-24 mr-4">
            <Skeleton borderRadius={6} height={20} inline={true} />
          </span>
          <span className="grow mb-2">
            <hr />
          </span>
          <span className="ml-6 flex h-7 items-center">
            <ChevronDownIcon
              className={"-rotate-180 h-6 w-6 transform"}
              aria-hidden="true"
            />
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3 grid-flow-row-dense">
          {items.map((item, idx) => (
            <IconSkeleton key={`skl-${idx}`} />
          ))}
        </div>
      </>
    );
  };

  return (
    <dl className="mt-6 space-y-12 mb-32">
      {!loaded && (
        <>
          <PackLoader />
          <PackLoader />
        </>
      )}
      {categories.map((category, index) => {
        return (
          <React.Fragment key={category._id}>
            {category.icons.length != 0 && (
              <IconAccordion category={category} count={category.icons.length}>
                <div
                  id={"category-" + category._id}
                  className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3 grid-flow-row-dense"
                >
                  {category.icons.map((icon) => {
                    // icon.svgCode = icon.svgCode.replace("<svg ", `<svg stroke-width="${ranges.strokeRange}" width="${ranges.sizeRange}" height="${ranges.sizeRange}" `);
                    icon.svgCode = icon.svgCode.replace(
                      new RegExp(/(stroke-width:)(.*\n?)(px;)/g),
                      ""
                    );
                    return (
                      <IconElement
                        iconColor={iconColor}
                        ranges={ranges}
                        key={icon._id}
                        icon={icon}
                        categoryDir={category.dir}
                        activeIcon={activeIcon}
                        setActiveIcon={setActiveIcon}
                      />
                    );
                  })}
                </div>
              </IconAccordion>
            )}
          </React.Fragment>
        );
      })}
      {/* hiii */}
    </dl>
  );
};

export default IconCategories;
