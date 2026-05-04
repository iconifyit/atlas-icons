import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from '../../shared/baseUrl';
import http from "../../services/httpService";
import CategoryCard from "../UI/CategoryCard/CategoryCard"
import styles from "./PackageList.module.scss";

const PackageList = () => {
    const [categories, setCategories] = useState([]);

    const baseUrl = BASE_URL;

    const fetchCategories = () => {
        http
            .get(`${baseUrl}category/categories-all`)
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    setCategories(res.data.categories)
                }
            }).catch(err => console.log(err));
    }


    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container">
            <div className={styles.header}>
                <h3>Icons</h3>
                <Link className={styles.addCategoryBtn} to="/admin/add-package">Add Category</Link>
            </div>
            
            <div className="grid grid-cols-4 gap-8">
                {categories.map(category => (
                    <CategoryCard key={category._id} category={category} />
                )
                )}
            </div>
        </div>
    )
}

export default PackageList