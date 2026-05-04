import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import EditCategoryName from "../UI/EditCategoryName/EditCategoryName";
import IconDropdownMenu from "../UI/IconDropdownMenu/IconDropdownMenu";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { BASE_URL, ICONS_PATH } from "../../shared/baseUrl";
import { Switch } from "@headlessui/react";
import http from "../../services/httpService";
import styles from "./EditPackage.module.scss";

const EditPackage = () => {
  const { catId } = useParams();

  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);
  const [editCatName, openEditCatName] = useState(false);
  const [categoryNameIsValid, setCategoryNameIsValid] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    dir: "",
    published: false,
  });
  const [categories, setCategories] = useState(false);
  const baseUrl = BASE_URL;
  const iconsPath = ICONS_PATH;

  useEffect(() => {
    getCategories();
    if (catId) {
      getCategoryData();
    }
  }, []);

  const getCategoryData = () => {
    http.get(`${baseUrl}category/${catId}`).then((res) => {
      const { category, icons } = res.data;
      icons?.forEach((icon) => {
        icon.tags = icon.tags.join(", ");
      });
      setCategory(category);
      setIcons(icons);
    });
  };

  const getCategories = () => {
    http.get(`${baseUrl}category/categories-names`).then((res) => {
      const { categories } = res.data;
      setCategories(categories);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category.name.trim() === "") {
      setCategoryNameIsValid(false);
      return;
    }
    setCategoryNameIsValid(true);
    setIsLoading(true);
    let data = {
      category,
      icons,
    };

    if (catId) {
      http
        .put(`${baseUrl}category`, data)
        .then((res) => {
          const { category: _category, icons: _icons } = res.data;

          if (res.data) {
            navigate("/admin/package-list");
          }
        })
        .catch((err) => console.log(err));
    } else {
      http
        .post(`${baseUrl}category`, data)
        .then((res) => {
          if (res.data) {
            navigate("/admin/package-list");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const onImageSelect = (files) => {
    if (!files.length) return;
    setIsLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("icons", files[i]);
    }

    http
      .post(`${baseUrl}icon/upload-icons`, formData)
      .then((res) => {
        const newIcons = [];
        res.data.forEach((icon) => {
          let { filename, originalFilename: name } = icon;
          name = name.replace(".svg", "").toLowerCase();
          let iconData = {
            name,
            tags: name,
            filename: filename,
          };
          newIcons.push(iconData);
        });
        setIcons([...icons, ...newIcons]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (
    { currentTarget: input },
    index,
    categoryName = false
  ) => {
    if (categoryName) {
      setCategory((category) => ({ ...category, name: input.value }));
    } else {
      icons[index][input.name] = input.value;
      setIcons((icons) => [...icons]);
    }
  };

  const onDeleteIcon = (id) => {
    const _icons = icons.filter((icon) => icon._id !== id);
    setIcons(_icons);
  };

  const onChangeCategoy = (id) => {
    const _icons = icons.filter((icon) => icon._id !== id);
    setIcons(_icons);
  };

  // const

  return (
    <>
      <div className="container mb-28">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#fbfbfb] py-20 my-12 rounded-[40px]">
            <div className="w-6/12 mx-auto">
              <h3 className="text-3xl text-center font-semibold mb-9">
                {catId ? "Edit" : "Add"} icon category
              </h3>
              <div className="flex items-end ">
                <div className={styles.iconInputGroup + " " + "grow !mb-0"}>
                  <label className="!mb-1 !text-base" htmlFor="category">
                    Category name
                  </label>
                  <input
                    disabled={category._id}
                    value={category.name}
                    className="!py-3 !px-8 !text-lg"
                    id="category"
                    name="packname"
                    onChange={(e) => handleChange(e, undefined, true)}
                    type="text"
                  />
                </div>

                <label htmlFor="image-input" className={styles.addIconsBtn}>
                  Add Icons
                </label>
              </div>
              {!categoryNameIsValid && (
                <p className="text-red-500 text-sm font-medium">
                  Category name must not be empty.
                </p>
              )}
              {category._id && (
                <button
                  className="text-sm text-[#3F28FF] ml-auto"
                  type="button"
                  onClick={() => {
                    openEditCatName(true);
                  }}
                >
                  Change Name
                </button>
              )}
              <div className="mt-4">
                <Switch.Group>
                  <div className="flex items-center justify-between">
                    <Switch.Label className="mr-4">
                    Published Pack
                    </Switch.Label>
                    <Switch
                      checked={category.published}
                      onChange={(value) =>
                        setCategory((category) => ({
                          ...category,
                          published: value,
                        }))
                      }
                      className={`${
                        category.published ? "bg-[#3F28FF]" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      
                      <span
                        className={`${
                          category.published ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                </Switch.Group>
              </div>
            </div>
          </div>

          <input
            type="file"
            id="image-input"
            onChange={(e) => onImageSelect(e.target.files)}
            multiple
            accept="image/svg+xml"
            hidden
          />
          <div>
            <div className=" grid grid-cols-3 gap-8">
              {!icons.length && (
                <p className="text-center col-span-3">No Icons Added Yet</p>
              )}
              {icons.map((icon, index) => {
                return (
                  <div
                    className="grid grid-cols-4 items-center border rounded-xl p-4"
                    key={index}
                  >
                    <div className="">
                      <img
                        className="w-20"
                        src={`${iconsPath}${icon._id ? "icons/" : ""}${
                          icon._id ? category.dir + "/" : ""
                        }${icon.filename}`}
                      />
                    </div>
                    <div className="col-span-3">
                      {icon._id && (
                        <IconDropdownMenu
                          categories={categories}
                          onDeleteIcon={onDeleteIcon}
                          onChangeCategoy={onChangeCategoy}
                          icon={icon}
                        />
                      )}
                      <div className={styles.iconInputGroup}>
                        <label htmlFor={"icon-name-" + index}>Name</label>

                        <div className="mt-1">
                          <input
                            onChange={(e) => handleChange(e, index)}
                            type="text"
                            name="name"
                            value={icon.name}
                            id={"icon-name-" + index}
                          />
                        </div>
                      </div>
                      <div className={styles.iconInputGroup}>
                        <label htmlFor={"icon-tags-" + index}>Tags</label>
                        <div className="mt-1">
                          <input
                            onChange={(e) => handleChange(e, index)}
                            type="text"
                            name="tags"
                            value={icon.tags}
                            id={"icon-tags-" + index}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <footer className="w-full bg-white fixed  py-3 bottom-0 left-0 right-0 drop-shadow-lg">
            <div className="container flex justify-between">
              <Link
                to="/admin/package-list"
                disabled={loading}
                className={styles.cancelBtn}
              >
                {" "}
                Cancel{" "}
              </Link>
              <button disabled={loading} className={styles.saveBtn}>
                {loading && <LoadingSpinner />}
                {!loading && <span>Save</span>}
              </button>
            </div>
          </footer>
        </form>
      </div>

      <EditCategoryName
        category={category}
        categorySaved={setCategory}
        closeModal={() => {
          openEditCatName(false);
        }}
        isOpen={editCatName}
      />
    </>
  );
};

export default EditPackage;
