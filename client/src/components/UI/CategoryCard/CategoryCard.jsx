import styles from "./CategoryCard.module.scss";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  category.icons.slice(0, 15).forEach((icon) => {
    const classOne = `cls-${icon._id}-1`;
    const classTwo = `cls-${icon._id}-2`;

    icon.svgCode = icon.svgCode.replaceAll("cls-1", classOne);
    icon.svgCode = icon.svgCode.replaceAll("cls-2", classTwo);
  });
  return (
    <Link to={`/admin/edit-package/${category._id}`}>
      <figure className={styles.iconSetContainer}>
        <div className="flex justify-between items-center mb-5 gap-4">
          <p className="truncate text-ellipsis overflow-hidden">{category.name}</p>
          <div>
            {!category.published && (
              <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-red-400">
                Draft
              </span>
            )}

            {category.icons.length}
          </div>
        </div>
        <div className="grid grid-cols-5 items-center gap-6">
          {category.icons.slice(0, 15).map((icon) => (
            <div
              key={icon._id}
              dangerouslySetInnerHTML={{ __html: icon.svgCode }}
            ></div>
          ))}
        </div>
      </figure>
    </Link>
  );
};

export default CategoryCard;
