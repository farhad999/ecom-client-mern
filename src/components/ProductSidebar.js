import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchBrands} from "../store/slices/brandSlice";
import {fetchCategories} from "../store/slices/categorySlice";
import {Link} from "react-router-dom";

const ProductSidebar = () => {

    const {brands, loading} = useSelector(state => state.brand);

    const {categories, loading: catLoading} = useSelector(state => state.cat);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchBrands());
        dispatch(fetchCategories())
    }, []);

    if (loading || catLoading) {
        return <div>loading...</div>
    }

    return (
        <div>

            <div>Top Brands</div>

            <div>
                {brands.map((brand, index) => (
                    <div>
                    <Link to={`/products?brand=${brand.slug}`}>
                        {brand.name}
                    </Link>
                    </div>
                ))}
            </div>

            <div>Top Categories</div>

            <div>
                {categories.map((cat, index) => (
                    <div key={index}>
                        <Link to={`/products?category=${cat.slug}`}>{cat.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ProductSidebar;
